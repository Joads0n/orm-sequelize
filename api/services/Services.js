const database = require('../models');

class Services {
    constructor(modelo){
        this.nomeModelo = modelo;
    }

    async getAllData(where = {}){
        return database[this.nomeModelo].findAll({ where: {...where} });
    }

    async getOneData(id){
        return database[this.nomeModelo].findOne({where: {id: id}})
    }

    async createRegistry(data){
        return database[this.nomeModelo].create(data);
    }       

    async updateOneData(data, id, transacao = {}){
        return database[this.nomeModelo].update(data, {where: {id: id}}, transacao)
    }

    async updateData(data, where, transacao = {}){
        return database[this.nomeModelo].update(data, {where: {...where}}, transacao)
    }

    async deleteData(id){
        return database[this.nomeModelo].destroy({where: {id: id}});
    }

    async restoreData(id){
        return database[this.nomeModelo].restore({
            where: {
                id : id
            }
        });
    }
}

module.exports = Services