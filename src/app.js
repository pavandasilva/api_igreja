const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

/* rotas */
const index = require('./routes/index');
const pessoas = require('./routes/pessoas');
const palavras = require('./routes/palavras');
const audios = require('./routes/audios');
const oracoes = require('./routes/oracoes');
const eventos = require('./routes/eventos');
const chats = require('./routes/chats');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('./assets'));
app.use('/', index);
app.use('/pessoas', pessoas);
app.use('/palavras', palavras)
app.use('/audios', audios);
app.use('/oracoes', oracoes);
app.use('/eventos', eventos);
app.use('/chat', chats);

module.exports = app;
