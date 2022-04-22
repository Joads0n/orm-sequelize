const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async registryActives(where = {}){
        return database[this.nomeModelo].findAll({ where: { ...where } })
    }

    async getAllregistry(where = {}){
        return database[this.nomeModelo].scope('todos').findAll({ where: {...where} })
    }

    async cancelaPessoaEMatricula(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.updateOneData({ ativo: false}, estudanteId, {transaction: transacao})
            await this.matriculas.updateData({ status: 'cancelado' }, { estudante_id: estudanteId }, {transaction: transacao})
        })
    }
}

module.exports = PessoasServices