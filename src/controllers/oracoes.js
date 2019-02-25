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
        'COUNT(oracoes_pessoas.oracao_pessoa_id) as qtde_pessoas ' +
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

exports.post_orar = (req, res) => {
    /*  Verifica se o usuário dono da mensagem é o mesmo usuario dono do token */
    if (req.body.pessoa_id_rem != req.pessoa_id) {
        res.status(401).json({ error: "Você não tem autorização para completar essa ação" });
        return;
    }

    mysql_connection.query(
        'INSERT INTO oracoes_pessoas(oracao_id, pessoa_id) VALUES(?, ?)',
        [req.body.oracao_id, req.pessoa_id],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ "error_code": error.code });
                return;
            }

            let insertId = result.insertId;
            res.status(201).json({ oracao_pessoa_id: insertId });
        });
};