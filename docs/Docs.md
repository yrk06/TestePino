# Documentação

Todo o código produzido para o software está distribuido em 3 diretórios:

- `\docs` contém documentação
- `\mysql` contém o código para a criação do banco de dados
- `\src` contém o código fonte da API

## Quickstart guide
Para utilizar o código é necessario:

1. Configurar um servidor MySQL, adicionar um usuário e criar o banco de dados utilizando o script SQL
2. Popular os dados do arquivo .env com os dados do banco de dados (host, port, user, password, database, mais detalhes abaixo)
3. Utilizar `npm install && npm run server` para inicializar o servidor
4. Usar um cliente HTTP para fazer as requisições ao servidor


## Banco de dados
O arquivo `database_config.sql` contém o código para a criação do banco de dados com a configuração necessária para a aplicação

## Código Fonte

### Quickstart
Para utilizar o código, `npm install` vai instalar as dependencias apropriadas. `npm run test` irá rodar Jest com os testes unitários de integração. `npm run server` irá inicializar o server e o watcher (que automaticamente reinicia o servidor se houver mudanças em algum arquivo)

### Index.js
O arquivo `index.js` possui o código de inicialização do servidor

### database.js
O arquivo `database.js` inicializa um pool de conexôes ao banco de dados e provê funções para adicionar e encontrar usuários

### /dataValidation
Essa pasta contem 2 arquivos:

`userSchema.js` utiliza a biblioteca Joi para criar um esquema de validação de objetos. Com essa esquema é possivel validar os dados de usuários de maneira simplificada. O formato utilizado em UserSchema é o formato esperado na requisição para criar um novo usuário (entretanto o CPF e o CEP podem ou não conter pontuação)

`validators.js` possui funções para normalizar CEP e CPF em um formato sem pontuação. Também possuí funções para validar CEPs e CPFs utilizando as regras de validação de cada um.

### /routes
Essa pasta contém 2 arquivos:

`email.js` implementação do Endpoint para o envio de mensagens à usuários. Esse endpoint espera um objeto do seguinte formato: `{cpf: <cpf>, message:<message>}`

`user.js` implementação dos Endpoints para a manipulação de dados dos usuários (criação e consultas).
`/user/registrar` utiliza o formato definido em UserSchema. `/user/all` não requer parametros `/user/<cpf>` recebe o CPF na URL como parametro

## .env
Esse arquivo configura as variáveis de ambiente para o servidor, dessa 
maneira não é necessário colocar os valores em código. Além disso esse 
arquivo não foi incluido por questões de segurança.

As variáveis disponíveis são:

- DBHOST host do banco de dados
- DBPORT porta do banco de dados
- DBUSER Username da conta no banco de dados 
- DBPASS Senha da conta no banco de dados
- DBNAME Nome da base de dados
- port Porta para o servidor escutar pedidos
