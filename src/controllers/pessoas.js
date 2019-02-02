const mysql_connection = require('../../config/mysql_connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET usuários comuns */
exports.getUsuarios = (req, res) => {
    mysql_connection.query('SELECT pessoa_id, nome, aniversario, ativo, foto, dt_cadastro FROM pessoas WHERE e_admin = "N"', (error, rows, fields) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json(rows);
    });
};

/* GET usuarios comuns por id */
exports.getUsuarioId = (req, res) => {
    mysql_connection.query(
        'SELECT pessoa_id, nome, aniversario, ativo, foto, dt_cadastro FROM pessoas WHERE e_admin = "N" AND  pessoa_id = ?',
        [req.params.pessoa_id],
        (error, rows) => {
            if (error) {
                console.log(error);

                res.status(500).json({ "error_code": error.code });
            }
            res.status(200).json(rows[0]);
        }
    );
};

/* POST Login usuário comum */
exports.postUsuariosLogin = (req, res) => {
    mysql_connection.query(
        'SELECT pessoa_id, nome, aniversario, ativo, foto, dt_cadastro, celular, senha FROM pessoas WHERE e_admin = "N" AND celular = ?',
        [req.body.celular],
        (error, rows) => {
            if (error) {
                console.log(error);
                res.status(500).json({ "error_code": error.code });
                return;
            }
            if (rows.length) {
                bcrypt.compare(req.body.senha, rows[0].senha).then(r => {
                    if (r)
                        res.status(201).json(rows[0]);
                    else
                        res.status(401).json({ "error_code": 401 });
                });
            } else {
                res.status(401).json({ "error_code": 401 });
            }
        });
};

exports.postUsuarios = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    /* Gera um coidgo de 4 dígitos */
    /* let codigo;
    while (codigo.length < 4){
        codigo = codigo + Math.floor(Math.random() * 10);
    } */
    
    res.status(500).json({ "error_code": Math.floor(Math.random() * 10) });
    return;

    mysql_connection.query(
        'SELECT * FROM pessoas WHERE celular = ?',
       [req.body.celular], 
        ((error, rows) => {
            if (rows.length) {
                res.status(409).json({"error_code": "Celular já cadastrado"});  
                return;
            }
        })
    );
 
    bcrypt.hash(req.body.senha, saltRounds, (err, hash) =>{
        let senha = hash;

        

        
        bcrypt.hash(Math.floor(Math.random() * 10), saltRounds, (err, hash) =>{
            let codigo = hash;
            
            mysql_connection.query(
                'INSERT INTO pessoas(nome, aniversario, senha, celular, codigo) VALUES(?, ?, ?, ?, ?)',
                [req.body.nome, req.body.aniversario, senha, req.body.celular, codigo], 
                (error, result) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({ "error_code": error.code });
                        return;
                    }
        
                    res.status(201).json(result);
                }); 

        }); 
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