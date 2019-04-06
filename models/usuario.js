const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

// Nossa variável enum
const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} não é permitido!'
}


const usuarioSchema = new Schema({

    nome: { type: String, required: [true, 'O campo nome é necessário'] },
    email: { type: String, unique: true, required: [true, 'O email é necessário'] },
    password: { type: String, required: [true, 'A senha é necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

})

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} deve ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema)