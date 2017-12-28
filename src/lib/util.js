const http = require('http');
console.log("archivo util");

const funcionCabeceras = (objs) => {
  const cabs = new Array();
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    for (const key in obj) {
      const attrName = key;
      const attrValue = obj[key];
      //Ocultamos el atributo URL, para no ser mostrado en la vista EJS
      if (attrName === "url") {} else {
        cabs.push(attrName);
      }
    }
  }
  return cabs;
};


/**
 Funcion que asigna un formato a los mensajes de respuesta para una peticion http.
 @param {estado} Estado de la peticion http.
 @param {mensaje} Mensaje a retornar.
 @param {datos} Datos obtenidos o generados para ser retornados.
 @return Retorna un {json} con los datos en el formato establecido.
*/
const funcionFormato = (_estado, _mensaje, _datos) => {
  const respuesta = {
    estado: _estado,
    mensaje: _mensaje,
    data: _datos,
  };

  return respuesta;
};

/**
 * Funcion para paginar y ordenar.
 * @param {json} query de la peticion http.
 * @return {json} query con datos adicionados.
 */
const paginar = (query) => {
  const respuesta = {};
  // page
  if(query.limit && query.page){
    respuesta.offset = (query.page - 1) * query.limit;
    respuesta.limit = query.limit;
  }
  // order
  if(query.order){
    if(query.order.charAt(0) == '-'){
      respuesta.order = `${query.order.substring(1, query.order.length)} DESC`;
    } else {
      respuesta.order = `${query.order}`;
    }
  }
  return respuesta;
}

/**
 * Funcion para saber si un elemente esta en un array
 * @param {String} cad cadena o palabra la que se busca
 * @param {Array} array array donde esta toda la informacion
 * @return {Boolean} True si encontro el objecto y falso caso contrario
 */

 const in_array = (cad, array) => {
    for (let i = 0, len = array.length;i <len ;i++) {
        if (array[i] == cad) return true;
    }
    return false;
}


/**
 * Funcion para saber si es un correo electronico válido
 * @param {String} email Correo electronico
 * @return {Boolean} True si es valido y Falso si es incorrecto
 */

const validar_correo = (email) => {
   const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
   if (emailRegex.test(email)) return true;
   return false;
 }


/**
 * Funcion para saber si es un tamaño determinado de caracteres
 * @param {String} cad parrafo a contar caracteres
 * @param {Integer} n numero de caracteres a verificar
 * @return {Boolean} True si es valido y Falso si es incorrecto
 */

 const contar_digitos = (cad, n) => {
   if (cad.length <= n) return true;
   return false;
 }


/**
 * Funcion para validar si tiene caracteres validos
 * @param {String} cadena parrafo a verificar caracteres
 * @param {String} caracteresValidos cadena de caracteres validos
 * @return {Boolean} True si es valido y Falso si es incorrecto
 */


 const validar_caracteres_especiales = (cadena, caracteresValidos) => {
   // TODO caracteresValidos ...
   const caracteresAdmitidos = /[a-zA-Z0-9&_\.-@,?¿\s]+$/g;
   if (cadena.match(caracteresAdmitidos)) return true;
   return false;
 }

/**
 * Funcion validar persona
 **/

const verifica_bodyPersona = (datos) => {
  let isValid = false;
  if (datos.hasOwnProperty('documento_identidad') && datos.hasOwnProperty('fecha_nacimiento')) {
    if (datos.documento_identidad === '') {
      isValid = true;
    }
    if (datos.fecha_nacimiento === '') {
      isValid = true;
    }
    if (datos.fecha_nacimiento instanceof Date && !isNaN(datos.fecha_nacimiento.valueOf())) {
      isValid = true;
    }
  } else {
    isValid = true;
  }
  return isValid;
};


/**
 * Conjunto de funciones para cambiar numero a su forma literal
 * @param {Integer} numero El numero a retornar en su forma literal
 * @return {String} Retorna la cadena literal del numero
 */

const Unidades = (num) => {
    switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }
    return "";
}

const Decenas = (num) => {

    let decena = Math.floor(num/10);
    let unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}

const DecenasY = (strSin, numUnidades) => {
    if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)
    return strSin;
}

const Centenas = (num) => {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}

const Seccion = (num, divisor, strSingular, strPlural) => {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}

const Miles = (num) => {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    let strCentenas = Centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}

const Millones = (num) => {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    let strMiles = Miles(resto);

    if(strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}

const NumeroALetras = (num) => {
    let data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'BOLIVIANOS',
        letrasMonedaSingular: 'BOLIVIANO',

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };

    if(data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}

const eliminarCaracteresEspeciales = (texto) => {
  return texto ? texto.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\']/g, '') : '';
};

const eliminaAcentos = (texto) =>  {
  texto = texto.replace(/á/gi,'a');
  texto = texto.replace(/é/gi,'e');
  texto = texto.replace(/í/gi,'i');
  texto = texto.replace(/ó/gi,'o');
  texto = texto.replace(/ú/gi,'u');
  return texto;
};


const eliminaDobleEspacio = (texto) =>  {
  return texto ? texto.replace(/\s +/g, ' ').trim() : '';
};

const eliminaEspaciosExtremos = (texto) => {
  return texto ? texto.trim() : '';
};

const convierteMinuscula = (texto) => {
  return texto ? texto.toLowerCase() : '';
};





module.exports = {
  funcionCabeceras,
  funcionFormato,
  paginar,
  in_array,
  verifica_bodyPersona,
  validar_correo,
  contar_digitos,
  validar_caracteres_especiales,
  NumeroALetras,
  eliminarCaracteresEspeciales,
  eliminaAcentos,
  eliminaDobleEspacio,
  eliminaEspaciosExtremos,
  convierteMinuscula
};
