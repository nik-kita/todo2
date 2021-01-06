const http = require('http');
const server = require('./server');

const port = server.get('port');

http.createServer(server).listen(port);
console.log('---------------------\nhttp://localhost:3000\n---------------------');
