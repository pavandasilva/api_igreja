const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);
const mysql_connection = require('../config/mysql_connection');

/* const socket_io = new Promise((resolve, reject) => {
    io.on('connection', function (socket) {
        resolve(socket);
    });  
}); */

io.on('connection', (socket) => {
    socket.on('vinculacao', (data) => {
        mysql_connection.query(
            'UPDATE pessoas SET socket_id= ? WHERE pessoa_id = ?',
            [socket.id, data.usuario_id],
            (error, rows) => {
                if (error) {
                    console.log(error);
                }

                console.log(data.usuario_id + ' ' + socket.id);
            }
        );
    });
});

module.exports = io;

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
});


