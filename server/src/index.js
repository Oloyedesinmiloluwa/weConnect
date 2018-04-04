import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config';
import businessRoute from './routes/businessRoute';
import userRoute from './routes/userRoute';
import swaggerDocument from './swagger';

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '')));
app.use('*', express.static(path.join(__dirname, '')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', businessRoute);
app.use('/api/v1/', userRoute);
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.all('*', (req, res) => res.status(404).send({
  message: 'You are not in the right place, pls input a valid endpoint',
}));
app.set('port', port);
dotenv.config();
const server = http.createServer(app);
server.listen(port);
module.exports = app;
