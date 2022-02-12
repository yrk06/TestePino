// Parse serve tanto para CEP quanto para CPF
const parse = (cpf) => {
    return cpf.replace(/[\.-]/g,'')
}

// Valida o CPF
const validateCPF = (cpf) => {
    if(!/^[0-9]{11}$/.test(cpf)) {return false} // Quantidade invalida de digitos
    if(/([0-9])\1{10}/.test(cpf)) {return false} // Todos Iguais
    // Primeiro Digito
    {
        let acc = 0
        for(let i = 0; i < 9; i++){
            acc += (10-i)*parseInt(cpf.charAt(i))
        }
        let digito = ( (acc*10)%11 ) %10
        if(digito !== parseInt(cpf.charAt(9))){
            return false
        }
    }

    // Segundo digito
    {
        let acc = 0
        for(let i = 0; i < 10; i++){
            acc += (11-i)*parseInt(cpf.charAt(i))
        }
        let digito = ( (acc*10)%11 ) %10
        if(digito !== parseInt(cpf.charAt(10))){
            return false
        }
    }
    return true;
}

/* Para o CEP um simples Regex funciona, 
uma vez que a API retorna erro caso o CEP seja inválido */
const validateCEP = (CEP) => {
    return /[0-9]{8}/.test(CEP)
}

module.exports = {parse, validateCPF, validateCEP}