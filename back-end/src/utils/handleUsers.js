function handleUsers (nome, nome_loja, email, senha) {
  if(!nome) {
    return "O campo 'nome' é obrigatório!";
  }

  if(!nome_loja) {
    return "O campo 'nome_loja' é obrigatorio!";
  }

  if(!email) {
    return "O campo 'email' é obrigatorio!";
  }

  if(!senha) {
    return "O campo 'senha' é obrigatorio!";
  }
}

module.exports = handleUsers;