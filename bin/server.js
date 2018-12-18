const app = require('../src/app');
const debug = require('debug')('igreja:server');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}