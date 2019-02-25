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
        'categorias_audi.nome as categoria, ' +
        'count(audios_like.audio_id) as qtde_likes, ' +
        'count(audios_like.audio_id) as qtde_compartilhamentos ' +
        'FROM audios ' +
        'INNER JOIN categorias_audi ' +
        'ON audios.categoria_audi_id = categorias_audi.categoria_audi_id ' +
        ' LEFT JOIN audios_like ' +
        ' ON audios.audio_id = audios_like.audio_id ' +
        ' LEFT JOIN audios_compartilhamentos ' +
        ' ON audios.audio_id = audios_compartilhamentos.audio_id ' +
        ' GROUP BY audios.audio_id, audios.titulo, audios.autor, audios.url, audios.dt_cadastro, categorias_audi.categoria_audi_id, categoria ';

    mysql_connection.query(sql, (error, rows, fields) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json(rows);
    });

});

exports.post = ((req, res) => {
    res.status(201).send({
        restfull: "audios",
        method: "post",
        req: req.body
    });
});

exports.put = (req, res) => {
    res.status(201).send({
        restfull: "audios",
        method: "put",
        id: req.params.id,
        req: req.body,
    });
};

exports.post_like = (req, res) => {
    mysql_connection.query(
        'INSERT INTO audios_like(audio_id, pessoa_id) VALUES(?, ?)',
        [req.pessoa_id, req.body.audio_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ "error_code": error.code });
                return;
            }

            res.status(201).json({ audio_like_id: result.insertId });
        });

};

