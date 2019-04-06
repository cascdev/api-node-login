
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')



// ==========================================
// Obter todos os usuarios
// ==========================================
exports.obterUsuarios = (req, res, next) => {

    Usuario.find({}, 'nome email img role')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensagem: 'Error carregando usuario',
                        erros: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                })

            })
}


// ==========================================
// Atualizar usuario
// ==========================================
exports.atualizaUsuario = (req, res) => {

    let id = req.params.id
    let body = req.body

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensagem: 'Error ao buscar usuario',
                erros: err
            })
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensagem: 'O usuario com o id ' + id + ' nao existe',
                erros: { message: 'Nao existe um usuario com esse ID' }
            })
        }
        usuario.nome  = body.nome
        usuario.email = body.email
        usuario.img   = body.img
        usuario.role  = body.role
        

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensagem: 'Error ao atualizar usuario',
                    erros: err
                })
            }
            usuarioGuardado.password = ':)'

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            })

        })

    })
}

// ==========================================
// Criar um novo usuario
// ==========================================
exports.criarUsuario = (req, res) => {

    let body = req.body

    let usuario = new Usuario({
        nome: body.nome,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        img: body.img,
        role: body.role
    })
    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensagem: 'Erro ao criar usuario',
                erros: err
            })
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        })

    })
}

// ============================================
//   Deletar/Excluir um usuario por seu id
// ============================================
exports.deletarUsuario = (req, res) => {

    let id = req.params.id

    Usuario.findByIdAndRemove(id, (err, usuarioExcluido) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensagem: 'Erro ao excluir o usuario',
                erros: err
            })
        }
        if (!usuarioExcluido) {
            return res.status(400).json({
                ok: false,
                mensagem: 'Nao existe um usuario com esse id',
                erros: { message: 'Nao existe um usuario com esse id' }
            })
        }
        res.status(200).json({
            ok: true,
            mensagem: `O usuário com o id: ${id} foi removido com sucesso.`,
            usuario: usuarioExcluido
        })

    })
}