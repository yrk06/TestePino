# Documentação

Todo o código produzido para o software está distribuido em 3 diretórios:

- `\docs` contém documentação
- `\mysql` contém o código para a criação do banco de dados
- `\src` contém o código fonte da API


## Banco de dados
O arquivo `database_config.sql` contém o código para a criação do banco de dados com a configuração necessária para a aplicação

## Código Fonte

### Index.js
O arquivo `index.js` possui o código de inicialização do servidor

### database.js
O arquivo `database.js` inicializa um pool de conexôes ao banco de dados e provê funções para adicionar e encontrar usuários

### /dataValidation
Essa pasta contem 2 arquivos:

`userSchema.js` utiliza a biblioteca Joi para criar um esquema de validação de objetos. Com essa esquema é possivel validar os dados de usuários de maneira simplificada

`validators.js` possui funções para normalizar CEP e CPF em um formato sem pontuação. Também possuí funções para validar CEPs e CPFs utilizando as regras de validação de cada um.

### /routes
Essa pasta contém 2 arquivos:

`email.js` implementação do Endpoint para o envio de mensagens à usuários.

`user.js` implementação dos Endpoints para a manipulação de dados dos usuários (criação e consultas).

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
