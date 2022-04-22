const Sequelize = require('sequelize');

const { PessoasServices, MatriculaServices } = require('../services');
const pessoasServices = new PessoasServices();
const matriculaServices = new MatriculaServices();

class PessoaController {
    static async getAllPessoas(req, res){
        try{
            const pessoas = await pessoasServices.getAllregistry();
            return res.status(200).json(pessoas);
        } catch (error) {
            console.log(pessoas)
            return res.status(500).json(error.message)
        }
    }

    static async getAPessoasActives(req, res){
        try{
            const pessoasActives = await pessoasServices.registryActives();
            return res.status(200).json(pessoasActives);
        } catch (error) {
            console.log(pessoas)
            return res.status(500).json(error.message)
        }
    }

    static async getPessoa(req, res) {
        const { id } = req.params
        try {
            const pessoa = await pessoasServices.getOneData(Number(id));
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createPessoa(req, res) {
        const newPessoa = req.body;
        try {
            const newPessoacreated = await pessoasServices.createRegistry(newPessoa);
            return res.status(200).json(newPessoacreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updatePessoa(req, res) {
        const { id } = req.params;
        const newData = req.body;
        try {
            await pessoasServices.updateOneData(newData, Number(id));
            const updatedPessoa = await pessoasServices.getOneData(Number(id));
            return res.status(200).json(updatedPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletePessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.deleteData(Number(id));
            return res.status(200).json(`id ${id} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restorePessoa(req, res){
        const { id } = req.params;
        try {
            await pessoasServices.restoreData(Number(id))
            return res.status(200).json({mensagem: `id ${id} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // MATRICULAS

    static async getMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const matricula = await matriculaServices.getMatriculaId(Number(estudanteId), Number(matriculaId));
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createMatricula(req, res) {
        const { estudanteId } = req.params;
        const newMatricula = {...req.body, estudante_id: Number(estudanteId)};
        try {
            const newPMatriculacreated = await matriculaServices.createRegistry(newMatricula);
            return res.status(200).json(newPMatriculacreated);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const newData = req.body;
        try {
            await matriculaServices.updateMatriculaRegistry(newData, Number(matriculaId), Number(estudanteId));
            const updatedMatricula = await matriculaServices.getOneData(Number(matriculaId));
            return res.status(200).json(updatedMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculaServices.deleteMatriculaRegistry(Number(estudanteId), Number(matriculaId));
            return res.status(200).json(`id ${matriculaId} deletado`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restoreMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculaServices.restoreMatriculaRegistry(Number(estudanteId), Number(matriculaId));
            return res.status(200).json({mensagem: `A matricula de ID ${matriculaId} do estudante ID ${estudanteId} restaurado`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await pessoasServices.getOneData(Number(estudanteId));
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getMatriculasPorTurmas(req, res) {
        const { turmaId } = req.params;
        try {
            const todasMatriculas = await matriculaServices.encontraEContaRegistros(
                {turma_id: Number(turmaId), tatus: 'confirmado'},
                {limit: 20, order: [['estudante_id', 'DESC']]}
            )
            return res.status(200).json(todasMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await matriculaServices.encontraEContaRegistros(
                {status: 'confirmado'},
                {attributes: ['turma_id'], group: ['turma_id'], having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)}
            )
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaMatriculaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId))
            return res.status(200).json(`Matriculas do(a) estudante de id=${estudanteId} foram canceladas`); 
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController