const mysql_connection = require('../../config/mysql_connection');

exports.get = ((req, res) => {
   /* GET audios */
   const sql = 
        'SELECT ' +
            'oracoes.oracao_id, ' + 
            'oracoes.texto, ' +
            'oracoes.dt_cadastro, ' +
            'pessoas.pessoa_id, ' +
            'pessoas.nome, ' +
            'pessoas.foto, ' +
            'COUNT(oracoes_pessoas.oracao.pessoa_id) as qtde_pessoas ' +
        'FROM oracoes ' +
        'INNER JOIN pessoas ' +
        'ON oracoes.pessoa_id = pessoas.pessoa_id ' +
        'LEFT JOIN oracoes_pessoas ' +
        'ON oracoes.pessoa_id = oracoes_pessoas.pessoa_id ' +
        'GROUP BY oracoes.oracao_id, oracoes.texto, oracoes.dt_cadastro, pessoas.pessoa_id, pessoas.nome, pessoas.foto';
   
    mysql_connection.query(sql, (error, rows, fields) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       
        res.status(200).json(rows);
    });

});

exports.post = (req, res) => {
    res.status(201).send({
        restfull: "audios",
        method: "post",
        req: req.body
    });
};

exports.put = (req, res) => {
    res.status(201).send({
        restfull: "audios",
        method: "put",
        id: req.params.id,
        req: req.body,
    });
};