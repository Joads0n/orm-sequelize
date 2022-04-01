const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()
router
 .get('/niveis', NivelController.getAllNiveis)
 .get('/niveis/:id', NivelController.getNivel)
 .post('/niveis', NivelController.createNivel)
 .put('/niveis/:id', NivelController.updateNivel)
 .delete('/niveis/:id', NivelController.deleteNivel)
 .post('/niveis/:id/restaura', NivelController.restoreNivel)

module.exports = router