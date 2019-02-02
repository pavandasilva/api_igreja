const mysql_connection = require('../../config/mysql_connection');

exports.get = ((req, res) => {
   /* GET eventos */
   const sql = 
        'SELECT ' +
            'evento_id, ' + 
            'titulo, ' +
            'local, ' +
            'rua, ' +
            'numero, ' +
            'bairro, ' +
            'cidade, ' +
            'dt_cadastro, ' +
            'observacoes, ' +
            'data, ' +
            'complemento ' +
        'FROM eventos ';

    mysql_connection.query(sql, (error, rows, fields) => {
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