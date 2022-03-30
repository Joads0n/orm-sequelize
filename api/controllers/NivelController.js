const database = require('../models');

class NivelController {
    static async getAllNiveis(req, res) {
        try {
          const niveis = await database.Niveis.findAll();
          return res.status(200).json(niveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getNivel(req, res) {
        const { id } = req.params
        try {
            const nivel = await database.Niveis.findOne({where: {id: Number(id)}});
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createNivel(req, res) {
        const newNivel = req.body;
        try {
            const newNivel = await database.Niveis.create(newNivel);
            return res.status(200).json(newNivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateNivel(req, res) {
        const { id } = req.params;
        const newData = req.body;
        try {
            await database.Niveis.update(newData, {where: {id: Number(id)}});
            const updatedNivel = await database.Niveis.findOne({where: {id: Number(id)}});
            return res.status(200).json(updatedNivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteNivel(req, res) {
        const { id } = req.params;
        try {
            await database.Niveis.destroy({where: {id: Number(id)}});
            return res.status(200).json(`id ${id} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController