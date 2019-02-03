const mysql_connection = require('../../config/mysql_connection');

exports.get = ((req, res) => {
    res.status(201).send({
        restfull: "chat",
        method: "get",
        req: req.body
    });
});

exports.post = (req, res) => {
    mysql_connection.query(
        'INSERT INTO chats(pessoa_id_dest, pessoa_id_rem, texto) VALUES(?, ?, ?)',
        [req.body.pessoa_id_dest, req.body.pessoa_id_rem, req.body.texto],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ "error_code": error.code });
                return;
            }

            res.status(201).json(result);
        });

    res.status(201).send({
        restfull: "chat",
        method: "post",
        req: req.body
    });
};

exports.put = (req, res) => {
    res.status(201).send({
        restfull: "",
        method: "put",
        id: req.params.id,
        req: req.body,
    });
};