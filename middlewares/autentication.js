const jwt = require('jsonwebtoken')
const SEED = require('../bin/configuration/variables').SEED


exports.verificaToken = function(req, res, next) {

    const token = req.query.token

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensagem: 'Token incorreto',
                errors: err
            })
        }

        req.usuario = decoded.usuario
        next()

    })

}

