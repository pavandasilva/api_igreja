const mysql_connection = require('../../config/mysql_connection');

exports.getPorId = ((req, res) => {
    //  Verifica se o usuário dono da mensagem é o mesmo usuario dono do token
    if(req.params.pessoa_id_rem != req.pessoa_id){
        res.status(401).json({error: "Você não tem autorização para ler as mensagens"});
        return;
    }

    mysql_connection.query(
        'SELECT chat_id, pessoa_id_dest, pessoa_id_rem, dt_cadastro, texto FROM chats WHERE (pessoa_id_rem = ? AND pessoa_id_dest = ?) or (pessoa_id_rem = ? AND pessoa_id_dest = ?) ORDER BY dt_cadastro',
        [req.params.pessoa_id_rem, req.params.pessoa_id_dest, req.params.pessoa_id_dest, req.params.pessoa_id_rem ],
        (error, rows) => {
            if (error) {
                console.log(error);

                res.status(500).json({ "error_code": error.code });
            }
            res.status(200).json(rows);
        }
    );
});

exports.post = (req, res) => {
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