import express from 'express';
import consign from 'consign';
import bodyParser from 'body-parser';

global._path = __dirname;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

console.log('inicio');
consign()
  .include('src/config/config.js')
  .then('src/lib/util.js')
  .then('src/db.js')
  .then('src/auth.js')
  .then('src/lib/middlewares.js')
  .then('src/lib/variables.js')
  .then('src/routes')
  .then('src/lib/boot.js')
  .into(app);
module.exports = app;
