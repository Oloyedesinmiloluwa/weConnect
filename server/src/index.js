import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import route from './routes/route';
import userRoute from './routes/userRoute';
import swaggerDocument from './swagger';

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', route);
app.use('/api/v1/', userRoute);
app.get('*', (req, res) => res.status(404).send({
  message: 'Not Found',
}));
app.set('port', port);
dotenv.config();
const server = http.createServer(app);
server.listen(port);
module.exports = app;
