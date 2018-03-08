import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import route from './routes/route';

const port = parseInt(process.env.PORT, 10) || 8000;
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', route);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;