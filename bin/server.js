const app = require('../src/app');
const debug = require('debug')('igreja:server');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

var socket = require('socket.io'), http_io = require('http'),
  server_io = http_io.createServer(), socket = socket.listen(server_io);
socket.on('connection', function(connection) {
   console.log('User Connected');
   
   connection.on('message', function(msg){
     socket.emit('message', msg);
   });
});

server.listen(4000, function(){
    console.log('Server started');
});

server.listen(port);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

function onListening() {
    const addr = server.address();

    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    debug('Listening on ' + bind);
}

module.exports = io;