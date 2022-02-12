const supertest = require('supertest');
const app = require('../index.js');

const db = require('../database.js')

//Fazer o Mock das funções da Base de Dados
jest.mock('../database.js');
jest.setTimeout(10000) // Dar mais tempo pro email enviar
test("Enviar Email", async () => {
    db.findUser.mockResolvedValue({email:"test@jest.com"})
    const response = await supertest(app)
    .post('/email')
    .send({
        cpf:"059.172.670-06",
        message: "This sentence is false"
    })
    expect(response.statusCode).toBe(200)
})