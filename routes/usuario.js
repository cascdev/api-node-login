const express = require('express')
const router = express.Router()

const _ctrl = require('../controllers/usuario-controller')
const mdAutentication = require('../middlewares/autentication')


// ==========================================
// Obter todos os usuarios
// ==========================================
router.get('/',_ctrl.obterUsuarios)

// ==========================================
// Atualizar usuario
// ==========================================
router.put('/:id',_ctrl.atualizaUsuario)

// ==========================================
// Criar um novo usuario
// ==========================================
router.post('/', mdAutentication.verificaToken , _ctrl.criarUsuario)

// ============================================
//   Deletar/Excluir um usuario por seu id
// ============================================
router.delete('/:id',_ctrl.deletarUsuario)

module.exports = router