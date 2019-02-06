const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);




teste = new Promise((resolve, reject) => {
    io.on('connection', function (socket) {
        resolve(socket);
    });  
});

module.exports = teste;

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
});


