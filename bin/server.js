const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

const socket_io = new Promise((resolve, reject) => {
    io.on('connection', function (socket) {
        resolve(socket);
    });  
});

module.exports = socket_io;

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
});


