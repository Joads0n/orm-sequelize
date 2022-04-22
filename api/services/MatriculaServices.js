const Services = require('./Services');
const database = require('../models');

class MatriculaServices extends Services {
    constructor(){
        super('Matriculas')
    }

    async getMatriculaId(estudanteId, matriculaId){
        return database[this.nomeModelo].findOne({
            where: {
                id: matriculaId,
                estudante_id: estudanteId
            }
        });
    }
    
    async updateMatriculaRegistry(data, estudanteId, matriculaId, transacao = {}){
        return database[this.nomeModelo].update(data, {where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }}, transacao);
    }

    async deleteMatriculaRegistry(estudanteId, matriculaId){
        return database[this.nomeModelo].destroy({where: {id: matriculaId, estudante_id: estudanteId}});
    }

    async restoreMatriculaRegistry(estudanteId, matriculaId){
        return database[this.nomeModelo].restore({where: {id: matriculaId, estudante_id: estudanteId}});
    }

    async encontraEContaRegistros(where = {}, agregadores){
        return database[this.nomeModelo].findAndCountAll({where: {...where}, ...agregadores})
    }
}

module.exports = MatriculaServices