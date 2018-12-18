const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

/* rotas */
const index = require('./routes/index');
const clientes = require('./routes/clientes');
const audios = require('./routes/audios');
/* const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        restfull: "Igreja API",
        versao: "1.0.1"
    });
}); */
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
app.use('/clientes', clientes);
app.use('/audios', audios);
module.exports = app;
