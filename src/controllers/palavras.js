const mysql_connection = require('../../config/mysql_connection');

/* GET palavras, se ja_exibida = "S" , traz somente as palavras que já foram exibidas, se for = 'N' traz as palavras que não foram exibidas */
exports.getExibida = (req, res) => {
    mysql_connection.query('SELECT palavra_id, texto, autor, ja_exibida, dt_cadastro FROM palavras WHERE ja_exibida = ?  ORDER BY RAND() LIMIT ? ', [req.params.ja_exibida, Number(req.params.qtde)], (error, rows, fields) => {
        /* Seta para lidas as palavras retornadas */
        for (let row of rows) 
            mysql_connection.query('UPDATE palavras SET ja_exibida = "S" where palavra_id = ?',  row.palavra_id);

       /*  Se o client quer mensagens não lidas, mas acabaram, são setadas todas as palavras como não lidas */
        if (!rows.lenght && req.params.ja_exibida == 'N'){
            mysql_connection.query('SELECT count(*) as qtde FROM palavras WHERE ja_exibida = "N"', (error, rows, fields) => {
                if (rows[0].qtde == 0)
                    mysql_connection.query('UPDATE palavras SET ja_exibida = "N"');
            }); 
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json(rows); 
    });
};
