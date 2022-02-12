CREATE DATABASE pino;
USE pino;

CREATE TABLE Clientes (
    /*CPF apenas digitos*/
	cpf CHAR(11) PRIMARY KEY,
    nome VARCHAR(256),
    /*URIs no geral tem limite de 2048 chars*/
    email VARCHAR(2048),
    /*CEP apenas digitos*/
    cep CHAR(8),
    logragouro VARCHAR(512),
    cidade VARCHAR(256),
    /* Estado apenas em sigla*/
    estado CHAR(2)
);