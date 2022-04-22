const Services = require('./Services');
const database = require('../models');

class TurmasServices extends Services {
    constructor(){
        super('Turmas')
    }
}

module.exports = TurmasServices