const express = require('express');
const router = express.Router();
const {
  listarClientes,
  adicionarCliente,
  atualizarCliente,
  excluirCliente
} = require('../controllers/clientesController');

router.get('/', listarClientes);
router.post('/', adicionarCliente);
router.put('/:id', atualizarCliente);     // ← nova rota para editar
router.delete('/:id', excluirCliente);    // ← nova rota para excluir

module.exports = router;