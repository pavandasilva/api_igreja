const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);



var socket_io = function(){
    return new Promise(function (resolve, reject) {
        io.on('connection', function (socket) {
            console.log(socket.id);
            return socket;
            //socket.on('vinculacao', function(data){ console.log(data)});
        });   
    });
}


module.exports = socket_io;

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
})
