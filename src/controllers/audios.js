exports.get = ((req, res) => {
    res.status(200).send({
        restfull: "audios",
        method: "get"
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