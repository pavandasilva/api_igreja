const mysql_connection = require('../../config/mysql_connection');

exports.get = ((req, res) => {
   /* GET audios */
    const sql = 
        'SELECT ' +
            'audios.audio_id, ' + 
            'audios.titulo, ' +
            'audios.autor, ' +
            'audios.url, ' +
            'audios.dt_cadastro, ' +
            'categorias_audi.categoria_audi_id, ' +
            'categorias_audi.nome as categoria ' +
        'FROM audios ' +
        'INNER JOIN categorias_audi ' +
        'ON audios.categoria_audi_id = categorias_audi.categoria_audi_id';
    
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