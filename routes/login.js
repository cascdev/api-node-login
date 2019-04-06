const express = require('express')
const router = express.Router()

const Usuario = require('../models/usuario')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SEED = require('../bin/configuration/variables').SEED


router.post('/', (req, res) => {

    const body = req.body

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                menssagem: 'Erro ao buscar usuário!',
                errors: err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensagem: 'Credenciais incorretas - email',
                errors: err
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensagem: 'Credenciais incorretas - password',
                errors: err
            })
        }

        // Criar um token!!!
        usuarioDB.password = ':)';
         
        const token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        })

    })


})






module.exports = router