import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import route from './routes/route';
import swaggerDocument from './swagger';

const port = parseInt(process.env.PORT, 10) || 8000;
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', route);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(404).send({
  message: 'Not Found',
}));
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
