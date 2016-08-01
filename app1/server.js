process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express.js');

var app = express();

app.listen(8080);

console.log('app1.facturactiva.com init... 8080');
