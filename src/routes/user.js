
// Funções da Base de dados
const { addUser, findUser} = require("../database.js")

// Libs de validação
const {parse:parseData, validateCEP, validateCPF} = require('../dataValidation/validators.js')
const {userSchema} = require('../dataValidation/userSchema.js')

// Instancia de Roteador
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

// Node fetch para requisições GET
const fetch = require("node-fetch");

// Endpoint de registro
router.post('/registrar', bodyParser.json(), async (req,res)=>{
    
    // Formatar CPF
    const userData = {...req.body}
    userData.cpf = parseData(req.body.cpf)

    // Validar o CPF
    if(!validateCPF(userData.cpf)){
        res.status(400).json({message:"CPF Invalido"})
        return
    }

    // Formatar CEP
    userData.cep = parseData(req.body.cep)
    
    // Validar o CEP
    if(!validateCEP(userData.cep)){
        res.status(400).json({message:"CEP Invalido"})
        return
    }
    // Validar dados de usuário
    /* A validação é feita antes de pegar os
     * dados de endereço, para salvar chamadas
     * à API de endereço caso os dados sejam invalidos
    */
    {
        const {value, error} = userSchema.validate(userData)
        if(error){
            res.status(400).json({message:error})
            return
        }
    }
    
    // Puxar dados da API de endereço
    const endereco = await fetch(`https://viacep.com.br/ws/${userData.cep}/json/`).then(res => res.json())
    if(endereco.erro){
        res.status(400).json({message:"CEP Inválido"})
        return
    }
    // Adicionar aos dados do usuário
    userData.logradouro = endereco.logradouro
    userData.cidade = endereco.localidade
    userData.estado = endereco.uf

    // Adicionar user ao Banco de Dados
    await addUser(userData)

    //Responder
    res.json({message:"Sucesso"})
})

// Endpoint de todos os usuários
router.get('/all', async (req,res) => {

    // Pegar todos os usuários
    const results = await findUser(false);

    //Responder como JSON
    res.json({clientes:results})
})

// Endpoint de usuário especifico
router.get('/:cpf', async (req,res) => {

    // Formatar CPF
    const cpf = parseData(req.params.cpf);

    // Encontrar user
    const result = await findUser(cpf);
    
    // Tratar erro de não encontrar usuário
    if(result){
        res.json(result)
    } else {
        res.status(404).json({message:"Cliente não cadastrado"})
    }
})

module.exports = router;