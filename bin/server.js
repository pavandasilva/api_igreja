const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('vinculacao', function(data){ console.log(data)});
});

var foo, callback;

module.exports = new Promise(function(resolve, reject){
    async.function(function(response) {
        foo = "foobar"

        resolve(foo);
    });
});



module.exports = io;

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
})
