const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


//  Cria uma instância do Express que será nossa aplicação
const app = express()

// Body Parser (imprecindível para usar os verbos do http além do GET)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importe das rotas
const appRoutes = require('./routes/app')
const usuarioRoutes = require('./routes/usuario')
const loginRoutes = require('./routes/login')


//************Configuração da conxão do mongoose com o banco de dados***********
const variables = require('./bin/configuration/variables')
//mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true) // essencial para usar o plugin unique-validator no Model/Schema
// Conexão com base de dados do mongoose, habilita os models e métodos
mongoose.connect(variables.Database.connection, {useNewUrlParser: true})
.then(() => {
	console.log('Banco iniciado com sucesso')
}).catch(err => {
	console.log(err)
})
//********************************************************************************

// Registre as rotas
app.use('/', appRoutes)
app.use('/login', loginRoutes)
app.use('/usuario', usuarioRoutes)

// Subindo um servidor para ouvir nossas requisições 
app.listen(variables.Api.port, () => {
    console.info(`Api inicializada com sucesso na porta ${variables.Api.port} `+ '\x1b[32m%s\x1b[0m', 'online')
})