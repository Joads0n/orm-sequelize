const database = require('../models');

class PessoaController {
    static async getAllPessoas(req, res){
        try{
            const pessoas = await database.Pessoas.scope('todos').findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(pessoas)
            return res.status(500).json(error.message)
        }
    }

    static async getAPessoasActives(req, res){
        try{
            const pessoasActives = await database.Pessoas.findAll();
            return res.status(200).json(pessoasActives);
        } catch (error) {
            console.log(pessoas)
            return res.status(500).json(error.message)
        }
    }

    static async getPessoa(req, res) {
        const { id } = req.params
        try {
            const pessoa = await database.Pessoas.findOne({where: {id: Number(id)}});
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createPessoa(req, res) {
        const newPessoa = req.body;
        try {
            const newPessoacreated = await database.Pessoas.create(newPessoa);
            return res.status(200).json(newPessoacreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updatePessoa(req, res) {
        const { id } = req.params;
        const newData = req.body;
        try {
            await database.Pessoas.update(newData, {where: {id: Number(id)}});
            const updatedPessoa = await database.Pessoas.findOne({where: {id: Number(id)}});
            return res.status(200).json(updatedPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletePessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({where: {id: Number(id)}});
            return res.status(200).json(`id ${id} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restorePessoa(req, res){
        const { id } = req.params;
        try {
            await database.Pessoas.restore({
                where: {
                    id : Number(id)
                }
            });
            return res.status(200).json({mensagem: `id ${id} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createMatricula(req, res) {
        const { estudanteId } = req.params;
        const newMatricula = {...req.body, estudante_id: Number(estudanteId)};
        try {
            const newPMatriculacreated = await database.Matriculas.create(newMatricula);
            return res.status(200).json(newPMatriculacreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const newData = req.body;
        try {
            await database.Matriculas.update(newData, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            const updatedMatricula = await database.Matriculas.findOne({where: {id: Number(matriculaId)}});
            return res.status(200).json(updatedMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(`id ${matriculaId} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json({mensagem: `A matricula de ID ${matriculaId} do estudante ID ${estudanteId} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController