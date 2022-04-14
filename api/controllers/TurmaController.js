const database = require('../models');
const Sequelize = require('sequelize');
const Operadores = Sequelize.Op

class TurmaController {
    static async getAllTurmas(req, res){
        const { data_inicial, data_final} = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Operadores.gte] = data_inicial : null
        data_final ? where.data_inicio[Operadores.lte] = data_final : null
        try {
            const turmas = await database.Turmas.findAll({ where });
            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }     
    }

    static async getTurma(req, res) {
        const { id } = req.params
        try {
            const turma = await database.Turmas.findOne({where: {id: Number(id)}});
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createTurma(req, res) {
        const newTurma = req.body;
        try {
            const newTurmaCreated = await database.Turmas.create(newTurma);
            return res.status(200).json(newTurmaCreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateTurma(req, res) {
        const { id } = req.params;
        const newData = req.body;
        try {
            await database.Turmas.update(newData, {where: {id: Number(id)}});
            const updatedTurma = await database.Turmas.findOne({where: {id: Number(id)}});
            return res.status(200).json(updatedTurma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.destroy({where: {id: Number(id)}});
            return res.status(200).json(`id ${id} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreTurma(req, res){
        const { id } = req.params;
        try {
            await database.Turmas.restore({
                where: {
                    id : Number(id)
                }
            });
            return res.status(200).json({mensagem: `id ${id} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


}

module.exports = TurmaController