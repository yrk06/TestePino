// Criar instancia do App express
const express = require('express')
const app = express()

// Configurar rotas
const userRoute = require("./routes/user.js")
const emailRoute = require("./routes/email.js")

app.use('/user',userRoute)
app.use('/email',emailRoute)

// Inicializar Servidor

if (require.main === module) {
    app.listen(process.env.port, () => console.log("Servidor Iniciado"))
}

module.exports = app
