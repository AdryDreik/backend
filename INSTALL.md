# EXAMEN AGETIC (BACKEND)

Antes de instalar el backend del examen de la agetic se debe realizar los siguiente:

#### Pasos para instalar GIT

- Para sistemas basados en UNIX
> Revisar como se realiza la instalación y configuración en ([SERVER.md](SERVER.md))

Luego de tener lo básico necesitamos instalar nuestra aplicación

#### Creación de la Base de Datos
Se debe crear la base de datos para la ejecución del backend, para ello conectarse con el siguiente comando:
```sh
$ psql -U postgres -h localhost
psql (9.5.4)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=#

Luego creamos la base de datos:
```sh
postgres=# CREATE DATABASE examen WITH OWNER postgres;
CREATE DATABASE
```
Para verificar que la base de datos se creó correctamente:
```sh
postgres=# \l
                                        List of databases
Name           |     Owner     | Encoding |   Collate   |    Ctype    |   Access privileges   
--------------------------+---------------+----------+-------------+-------------+-----------------------

examen              | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 |


template0                | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
|               |          |             |             | postgres=CTc/postgres
template1                | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
|               |          |             |             | postgres=CTc/postgres
(1 rows)

Para salir de la consola de postgres

```sh
postgres=# \q
```

#### Instalación

Para instalar el proyecto debemos clonarlo desde nuestro repositorio o si es que se paso en un archivo compreso de tipo zip u otro desconprimirlo:

```sh
$ git clone git@gitlab.geo.gob.bo:agetic/[$nombreRepositorio].git
```

Ingresar a la carpeta:
```sh
$ cd backend
```
Podemos verificar que estamos en el branch master:

```
$ git status
```
Nos devolverá:
```
On branch master
```
Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es `branch_copia_master`) ejecutamos:

```
$ git checkout branch_copia_master
```

Al volver a verificar con git status:
```
$ git status
```

Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```
On branch branch_copia_master
```

Para instalar la aplicación, se tienen las siguientes opciones:

###### Instalar dependencias del proyecto

Ejecutar el comando npm install que instalará todas las dependencias que el proyecto necesita:
```
$ npm install
```

#### Archivos de Configuración

Para modificar los datos de conexión a la base de datos y para modificar el puerto de conexión de **desarrollo** realizar una copia del archivo `src/config/config.environment.js` y cambiar los datos de conexión a la base de datos respectiva, el archivo debería ser nombrado de la siguiente manera:

- `src/config/config.development.js`

Para modificar los datos de conexión a la base de datos y para modificar el puerto de conexión de **test** realizar una copia del archivo `src/config/config.environment.js` y cambiar los datos de conexión a la base de datos respectiva, el archivo debería ser nombrado de la siguiente manera:

- `src/config/config.test.js`

En ambos casos, es importante cambiar lo siguiente:
- `username - nombre de usuario de la base de datos`
- `password - contraseña del usuario de la base de datos`
- `database - nombre de la base de datos`
- `host - servidor donde se encuentra la base de datos`
- `demás variables`

#### Configuración del entorno

Para configurar la conexión a la base de datos de los seeders y migraciones debemos realizar una copia del archivo `config/config.js.sample` y renombrarlo bajo el nombre `config/config.js` con los datos necesarios para la conexión a la base de datos (este archivo es utilizado para los seeders y las migraciones).

Para configurar variables del sistema se debe realizar una copia del archivo `config/app.json.sample` y renombrarlo bajo el nombre de `config/app.json`.
Para el archivo `config/app.json` se pueden realizar la siguientes configuraciones:

- Modificar la configuración de los servicios, modificar según el ambiente en el que se vaya a levantar la aplicación (development, test, production).

## Iniciar la aplicación

Las opciones de ejecución son las siguientes:
+ Genera o regenera las tablas necesarias en la base de datos y ejecuta los seeders y migrations.
```
$ npm run setup
```

+ Levanta el sistema en modo developer, se reinicia en cada cambio realizado en los archivos..
```
$ npm run startdev
```
+ Levanta el sistema en modo normal
```
$ npm run start
```
+ Ejecuta el eslint para verificar el estandar de programacion, actualmente esta basado en: [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript).
```
$ npm run lint
```
+ Genera la documentación del sistema
```
$ npm run apidoc
```

##### RAM

NodeJS por defecto utiliza 1.76GB en máquinas de 64 bits, para aumentar este parámetro es necesario utilizar el siguiente comando: "--max_old_space_size=".

Para hacer esto, se debe modificar el archivo package.json, en la opción start, línea 7 aproximadamente, por ejemplo para utilizar 4GB de RAM cambiar por:

```sh
...
...
  "scripts": {
    "start": "babel-node --max_old_space_size=4096 index.js",
    ...
  }
...
...
```
Referencia:
> http://prestonparry.com/articles/IncreaseNodeJSMemorySize/


## Configuración de supervisor
Si se desea hacer correr la aplicación mediante `supervisor` se debe realizar la siguiente configuración:

Navegar hasta la ruta:
```sh
$ cd /etc/supervisor/conf.d/
```
Crear un archivo para hacer correr la aplicación de backend, en este ejemplo, se definirá el archivo bajo el nombre de `yuriniaBackendDEV`:
```sh
$ sudo touch yuriniaBackendDEV.conf
```
Nota
- Si no te no te permite modificar el archivo yuriniaBackendDEV.conf
```
$ sudo chmod 777 yuriniaBackendDEV.conf
```
Y colocar el siguiente contenido:

##### Ambiente de desarrollo

```sh
[program:yuriniaBackendDEV]
command=/home/usuario/.nvm/versions/node/v6.10.1/bin/npm start
directory=/home/usuario/yurinia-sisnodi-backend
autostart=true
autorestart=true
stderr_logfile=/var/log/yuriniaBackendDEV.err.log
stdout_logfile=/var/log/yuriniaBackendDEV.out.log
user=usuario
```

##### Reiniciar "supervisor"
Cuando se hagan cambios y se requiere reiniciar el servicio "supervisor" para que se ejecute la aplicación:
```sh
$ sudo /etc/init.d/supervisor restart
```
Para verificar que la aplicación este efectivamente corriendo, se puede ejecutar el siguiente comando, y verificar que la aplicación este corriendo en el puerto configurado:
```sh
$ netstat -ltpn

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      -               
tcp6       0      0 :::4000                 :::*                    LISTEN      32274/nodejs
tcp6       0      0 :::3000                 :::*                    LISTEN      4381/gulp
```

Ó se puede revisar las tareas del `supervisor`, buscar el nombre de la tarea y su respectivo estado:

```sh
$ sudo supervisorctl

yuriniaBackendDEV                   RUNNING    pid 4617, uptime 3 days, 21:41:05
```

##### Configuración del crontab
Editar el archivo /etc/crontab
```sh
$ sudo nano /etc/crontab
```
Adicionar las siguientes lineas:
```sh
*/5 *   * * *   root    /usr/bin/curl -X GET http://localhost:4000/caducados/hora
01 00   * * *   root    /usr/bin/curl -X GET http://localhost:4000/caducados/dia
01 00   * * *   root    /usr/bin/curl -X GET http://localhost:4000/caducados/en_proceso

```

Posteriormente reiniciar el servicio
```sh
sudo service cron restart
```
