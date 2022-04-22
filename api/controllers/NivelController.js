const { NiveisServices } = require('../services');
const niveisServices = new NiveisServices();

class NivelController {
    static async getAllNiveis(req, res) {
        try {
          const niveis = await niveisServices.getAllData();
          return res.status(200).json(niveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getNivel(req, res) {
        const { id } = req.params
        try {
            const nivel = await niveisServices.getOneData(Number(id));
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createNivel(req, res) {
        const newNivel = req.body;
        try {
            const newNivelCreated = await niveisServices.createRegistry(newNivel);
            return res.status(200).json(newNivelCreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateNivel(req, res) {
        const { id } = req.params;
        const newData = req.body;
        try {
            await niveisServices.updateOneData(newData, Number(id));
            const updatedNivel = await niveisServices.getOneData(Number(id));
            return res.status(200).json(updatedNivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteNivel(req, res) {
        const { id } = req.params;
        try {
            await niveisServices.deleteData(Number(id));
            return res.status(200).json(`id ${id} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreNivel(req, res){
        const { id } = req.params;
        try {
            await niveisServices.restoreData(Number(id));
            return res.status(200).json({mensagem: `id ${id} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController