const variables = {

    Api: {
        port: process.env.port || 3000  
    },
    Database: {
        connection: process.env.connection || 'mongodb://localhost:27017/test'
    },
    SEED: '12345ABCDE'
    
}

module.exports = variables

