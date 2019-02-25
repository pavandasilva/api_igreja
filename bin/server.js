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

        mysql_connection.query(
            'UPDATE socket_pessoas SET conectado = "N", data_desconexao = NOW() WHERE socket_id = ?',
            [socket.id],
            (error, rows) => {
                if (error) {
                    console.log(error);
                }

                console.log('Usuário: ' + data.usuario_id + ' vinculado ao socket: ' + socket.id);
            }
        ); 

        mysql_connection.query(
            'INSERT INTO socket_pessoas(socket_id, pessoa_id, conectado) VALUES(?, ?, ?)',
            [socket.id, data.usuario_id, 'S'],
            (error, rows) => {
                if (error) {
                    console.log(error);
                }

                console.log('Usuário: ' + data.usuario_id + ' vinculado ao socket: ' + socket.id);
            }
        ); 

    });
    
    socket.on('vinculacao', (data) => {
        mysql_connection.query(
            'INSERT INTO socket_pessoas(socket_id, pessoa_id, tag) VALUES(?, ?, ?)',
            [socket.id, data.usuario_id, data.tag],
            (error, rows) => {
                if (error) {
                    console.log(error);
                }

                console.log('Usuário: ' + data.usuario_id + ' vinculado ao socket: ' + socket.id);
            }
        ); 
    });

    socket.on('desvinculacao', (data) => {
        mysql_connection.query(
            'UPDATE socket_pessoas SET conectado = "N", data_desconexao = NOW() where tag = ? AND socket_id = ?',
            [data.tag, socket.id],
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

