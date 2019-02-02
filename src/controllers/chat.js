const mysql_connection = require('../../config/mysql_connection');

exports.get = ((req, res) => {
    res.status(201).send({
        restfull: "chat",
        method: "get",
        req: req.body
    });
});

exports.post = (req, res) => {
    res.status(201).send({
        restfull: "chat",
        method: "post",
        req: req.body
    });
};

exports.put = (req, res) => {
    res.status(201).send({
        restfull: "chat",
        method: "put",
        id: req.params.id,
        req: req.body,
    });
};