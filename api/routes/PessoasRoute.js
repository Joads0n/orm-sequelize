const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router()

router.get('/pessoas', PessoaController.getAllPessoas);
router.get('/pessoas/ativas', PessoaController.getAPessoasActives);
router.get('/pessoas/all', PessoaController.getAllPessoas);
router.get('/pessoas/:id', PessoaController.getPessoa);
router.get('/pessoas/:estudanteId/matricula', PessoaController.getMatriculas);


router.post('/pessoas', PessoaController.createPessoa);
router.put('/pessoas/:id', PessoaController.updatePessoa);
router.delete('/pessoas/:id', PessoaController.deletePessoa);
router.post('/pessoas/:id/restaura', PessoaController.restorePessoa);

router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaMatriculaPessoa);

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.getMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.createMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.updateMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restoreMatricula);

router.get('/pessoas/matricula/:turmaId/confirmado', PessoaController.getMatriculasPorTurmas);
router.get('/pessoas/matricula/lotada', PessoaController.getTurmasLotadas);
module.exports = router