const app = require('../src/app');
const app_socket_io = require('../src/app');
const http = require('http');
const port = 3000;
const port_socket_io = 4000;

app.set('port', port);
app_socket_io.set('port', port_socket_io);

const server = http.createServer(app);
const server_socket_io = http.createServer(app_socket_io);
//const io = require('socket.io')(server);
global.io = require('socket.io')(server_socket_io);
const mysql_connection = require('../config/mysql_connection');

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log(socket.id + ' desconectado');
    });
    
    socket.on('vinculacao', (data) => {
        mysql_connection.query(
            'UPDATE pessoas SET socket_id= ? WHERE pessoa_id = ?',
            [socket.id, data.usuario_id],
            (error, rows) => {
                if (error) {
                    console.log(error);
                }

                console.log('Usuário: ' + data.usuario_id + ' vinculado ao socket: ' + socket.id);
            }
        ); 
    });
});

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
});


