const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router()

router
 .get('/turmas', TurmaController.getAllTurmas)
 .get('/turmas/:id', TurmaController.getTurma)
 .post('/turmas', TurmaController.createTurma)
 .put('/turmas/:id', TurmaController.updateTurma)
 .delete('/turmas/:id', TurmaController.deleteTurma)

module.exports = router