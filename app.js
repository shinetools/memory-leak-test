require('@google-cloud/debug-agent').start({ allowExpressions: true });
const express = require('express');
const yes = require('yes-https');
const helmet = require('helmet');
const SwaggerExpress = require('swagger-express-mw');

const config = require('./config');

const app = express();
const port = config.get('PORT');

app.use(yes());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

module.exports = new Promise(resolve => {
  SwaggerExpress.create(
    {
      appRoot: __dirname,
    },
    (error, swaggerExpress) => {
      if (error) {
        throw error;
      }

      swaggerExpress.register(app);

      const server = app.listen(port, () => {
        resolve(server);
      });
    },
  );
});
