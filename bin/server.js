const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);
//const io = require('socket.io')(server);
global.io = require('socket.io')(server);
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

server.listen(port + process.env.NODE_APP_INSTANCE);

