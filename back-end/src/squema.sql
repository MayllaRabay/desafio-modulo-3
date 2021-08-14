CREATE DATABASE market_cubos;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_loja TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  estoque TEXT NOT NULL,
  categoria TEXT,
  preco INTEGER NOT NULL,
  descricao TEXT NOT NULL,
  imagem TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);