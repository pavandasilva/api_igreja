const app = require('../src/app');
const debug = require('debug')('igreja:server');
const http = require('http');
var fs = require('fs');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);


io.on('connection', function (connection) {
    console.log(connection.id);
});

io.on('my vinc_socket_id', function (data) {
    console.log(data);
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
