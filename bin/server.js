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


io.on('connection', function (socket) {
    socket.on('vinculacao', (data)=>{
        console.log(data.pessoa_id + ' ' + socket.id);
    });
    
    /* mysql_connection.query(
        'UPDATE pessoas SET socket_id=? WHERE pessoa_id = ',
        [req.params.pessoa_id_rem, req.params.pessoa_id_dest, req.params.pessoa_id_dest, req.params.pessoa_id_rem],
        (error, rows) => {
            if (error) {
                console.log(error);

                res.status(500).json({ "error_code": error.code });
            }
            res.status(200).json(rows);
        }
    ); */
});  



module.exports = io;

server.listen(port, function () {
    console.log('Rodando na porta ' + port);
});


