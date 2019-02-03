const mysql_connection = require('../../config/mysql_connection');

exports.get = ((req, res) => {
    res.status(201).send({
        restfull: "chat",
        method: "get",
        req: req.body
    });
});

exports.post = (req, res) => {

    res.status(401).send(req.body.texto);
    return;
   /*  Verifica se o usuário dono da mensagem é o mesmo usuario dono do token */
    if(req.body.pessoa_id_rem != req.pessoa_id){
        res.status(401).json({error: "Você não tem autorização para enviar essa mensagem"});
        return;
    }

    mysql_connection.query(
        'INSERT INTO chats(pessoa_id_dest, pessoa_id_rem, texto) VALUES(?, ?, ?)',
        [req.body.pessoa_id_dest, req.body.pessoa_id_rem, req.body.texto],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ "error_code": error.code });
                return;
            }

            res.status(201).json({chat_id: result.insertId});
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