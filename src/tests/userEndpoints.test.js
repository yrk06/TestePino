const supertest = require('supertest');
const app = require('../index.js');

const db = require('../database.js')

//Fazer o Mock das funções da Base de Dados
jest.mock('../database.js');

test("Criar user novo", async () => {
    db.addUser.mockResolvedValue(true)
    const response = await supertest(app)
    .post('/user/registrar')
    .send({
        nome:"Yerik 4",
        cpf:"059.172.670-06",
        email:"yerik@mail.com",
        cep:"85853-868"
    })
    expect(response.statusCode).toBe(200)
})

test("Consulta de usuário existente", async () => {
    db.findUser.mockResolvedValue({user:"test"})
    const response = await supertest(app)
    .get('/user/05917267006')
    expect(response.statusCode).toBe(200)
})

test("Consulta de usuário inexistente", async () => {
    db.findUser.mockResolvedValue(undefined)
    const response = await supertest(app)
    .get('/user/05917267006')
    expect(response.statusCode).toBe(404)
})

test("Consulta de todos os Usuários",async () => {
    db.findUser.mockResolvedValue([{user:"test"},{user:"test1"},{user:"test2"},{user:"test3"}])
    const response = await supertest(app)
    .get('/user/all')
    expect(response.statusCode).toBe(200)
})