CREATE DATABASE market_cubos;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_loja TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  estoque TEXT NOT NULL,
  categoria TEXT,
  preco INTEGER NOT NULL,
  descricao TEXT NOT NULL,
  imagem TEXT
);