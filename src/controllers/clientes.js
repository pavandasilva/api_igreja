const mysql_connection = require('../../config/mysql_connection');

/* GET clientes */
exports.get = (req, res) => {
    mysql_connection.query('SELECT cliente_id, nome, aniversario, ativo, foto, dt_cadastro, email FROM clientes', (error, rows, fields) => {
        res.status(200).json(rows);
    });
};

/* GET clientes por id */
exports.getId = (req, res) => {
    mysql_connection.query(
        'SELECT cliente_id, nome, aniversario, ativo, foto, dt_cadastro, email FROM clientes where cliente_id = ?',
        [req.params.cliente_id],
        (error, rows) => {
            if (error) {
                console.log(error);
                res.status(500).json({ "error_code": error.code });
            }
            res.status(200).json(rows);
        }
    );
};

exports.post = (req, res) => {
    res.status(201).send({
        restfull: "clientes",
        method: "post",
        req: req.body
    });
};

exports.put = (req, res) => {
    res.status(201).send({
        restfull: "clientes",
        method: "put",
        id: req.params.id,
        req: req.body,
    });
};