const bodyParser = require('body-parser');
const pessoas = require('./PessoasRoute');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoas);
}