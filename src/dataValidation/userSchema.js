const joi = require('joi')

// Utilizando o Joi para definir o objeto de usuário
const userSchema = joi.object({
    nome:joi.string().max(256).required(),
    cpf:joi.string().length(11),
    email:joi.string().max(2048),
    cep:joi.string().length(8),
    //As informações de endereço são adicionadas pelo Backend, sem necessidade de verificar com o joi

})

module.exports = {userSchema}