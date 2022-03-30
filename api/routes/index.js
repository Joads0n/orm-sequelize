const bodyParser = require('body-parser');
const pessoas = require('./PessoasRoute');
const niveis = require('./niveisRoute');
const turmas = require('./turmasRoute');

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas,
        niveis,
        turmas
    );
}