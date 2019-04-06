const express = require('express')

const router = express.Router()



router.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        mensagem: 'Pedido ao servidor realizado corretamente'
    })

})

module.exports = router

// Esta rota é apenas o get para a URL base, ou melhor a principal.