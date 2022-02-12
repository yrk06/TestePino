require("dotenv").config()

const sql = require("mysql")

// Inicializar o pool de conexões
const connectionPool = sql.createPool({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
})

/* 
userData = {
    cpf,
    nome,
    email,
    cep,
    logradouro,
    cidade,
    estado,
}
*/
// Função para adicionar User no banco de dados
const addUser = async (userData) => {
    const {error, results, fields} = await new Promise(resolve => {
        connectionPool.query(
            `INSERT INTO Clientes VALUES
            (?,?,?,?,?,?,?);`, // Query
            [userData.cpf,userData.nome,userData.email,userData.cep,
            userData.logradouro,userData.cidade,userData.estado], // Variables
            (error, results, fields) => { //Callback
            resolve({error, results, fields})
        })
    })
    return
}

/* Função para encontrar Users no banco de dados. 
Caso não haja um CPF, retorna todos os users */
const findUser = async (cpf) => {
    if(!cpf){
        const {error, results, fields} = await new Promise(resolve => {
            connectionPool.query(
                `SELECT * FROM Clientes;`, // Query
                [cpf], // Variables
                (error, results, fields) => { //Callback
                resolve({error, results, fields})
            })
        }) 
        return results
    }
    const {error, results, fields} = await new Promise(resolve => {
        connectionPool.query(
            `SELECT * FROM Clientes WHERE cpf = ?;`, // Query
            [cpf], // Variables
            (error, results, fields) => { //Callback
            resolve({error, results, fields})
        })
    })
    return results[0]
}

module.exports = {addUser, findUser}