const connection = require('../connection');

function handleProducts (nome, estoque, preco, descricao) {
  if(!nome) {
    return "O campo 'nome' é obrigatório!";
  }

  if(!estoque) {
    return "O campo 'estoque' é obrigatório!";
  }

  if(!preco) {
    return "O campo 'preço' é obrigatório!";
  }

  if(!descricao) {
    return "O campo 'descrição' é obrigatório!";
  }
}

async function handleSearchedProducts (infoUser, id) {
  const queryProduct = `
    SELECT *
    FROM produtos
    WHERE usuario_id = $1
    AND id = $2;
  `
  
  const checkProduct = await connection.query(queryProduct, [infoUser.id, id]);

  if(checkProduct.rowCount === 0) {
    return `Desculpe, produto com id ${id} não encontrado!`;
  }
}

module.exports = { 
  handleProducts, 
  handleSearchedProducts 
};