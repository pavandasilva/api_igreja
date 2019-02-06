const app = require('../src/app');
const debug = require('debug')('igreja:server');
const http = require('http');
var fs = require('fs');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('reply', function(){ /* */ });
});



server.listen(port, function () {
    console.log('Rodando na porta ' + port);
})
