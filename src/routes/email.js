
// Criação da instancia de roteador
const express = require('express');
const router = express.Router();

//Body parser para aceitar mensagens em JSON
const bodyParser = require('body-parser')

// Função do Banco de dados que sera utilizada
const {findUser} = require("../database.js")
const {parse:parseData} = require('../dataValidation/validators.js')

// Modulo para enviar mensagens
const nodemailer = require("nodemailer");

// Implementação do Endpoint
router.post('/',bodyParser.json(), async (req,res) => {
    
    // Normalizar CPF
    const cpf = parseData(req.body.cpf);
    
    // Procurar usuário
    const result = await findUser(cpf);
    
    // Caso de erro: usuário não existe
    if(!result){
        res.status(404).json({message:"Cliente não cadastrado"})
        return
    }

    // Utilizando uma conta de teste do Ethereal
    let testAccount = await nodemailer.createTestAccount();

    // Criando um transportador para a conta de teste
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });
    
    // Enviar o email
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // Remetente
        to: result.email, // Destinatário (pode ser uma lista)
        subject: "Mensagem", // Topico
        text: req.body.message, // Mensagem (pode ser tanto HTML quanto PlainText)
    });

    //Dados da mensagem enviada
    console.log("Message sent: %s", info.messageId);

    // Preview da mensagem (por se tratar de um teste e não ser possivel ver em um email)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.end()
    return
})

module.exports = router