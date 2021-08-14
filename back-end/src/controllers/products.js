const connection = require('../connection');
const { handleProducts, validateSearchedProduct } = require('../utils/handleProducts');

const listAllProducts = async (req, res) => {
  const { infoUser } = req;
  const category = req.query.categoria;
  const minPrice = Number(req.query.precoMinimo);
  const maxPrice = Number(req.query.precoMaximo);

  try {
    if(category) {
      const queryCategory = `
        SELECT *
        FROM produtos
        WHERE usuario_id = $1
        AND categoria = $2;
      `

      const searchedProducts = await connection.query(queryCategory, [infoUser.id, category]);

      if(searchedProducts.rowCount === 0) {
        return res.status(404).json(`Nenhum produto da categoria ${categoria} foi encontrado.`);
      }

      return res.status(200).json(searchedProducts.rows);
    }

    if((minPrice && !maxPrice) || (!minPrice && maxPrice)) {
      return res.status(400).json('Por favor informe um preço mínimo e um preço máximo válidos.');
    }

    if(minPrice > maxPrice) {
      return res.status(400).json('O preço mínimo precisa ser menor que o preço máximo.');
    }

    if(minPrice && maxPrice) {
      const queryPrice = `
        SELECT *
        FROM produtos
        WHERE usuario_id = $1
        AND preco/100 BETWEEN $2 AND $3;
      `

      const searchedProducts = await connection.query(queryPrice, [infoUser.id, minPrice, maxPrice]);

      if(searchedProducts.rowCount === 0) {
        return res.status(404).json('Nenhum produto nessa faixa de preço foi encontrado.');
      }

      return res.status(200).json(searchedProducts.rows);
    }

    const query = `
      SELECT * 
      FROM produtos 
      WHERE usuario_id = $1;
    `
    const allProducts = await connection.query(query, [infoUser.id]);

    if(allProducts.rowCount === 0) {
      return res.status(404).json('Nenhum produto cadastrado!');
    }
    
    return res.status(200).json(allProducts.rows);

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const listProductId = async (req, res) => {
  const { infoUser } = req;
  const { id } = req.params;

  try {
    const query = `
      SELECT * 
      FROM produtos 
      WHERE usuario_id = $1 
      AND id = $2;
    `
    const product = await connection.query(query, [infoUser.id, id]);

    if(product.rowCount === 0) {
      return res.status(404).json('Produto não encontrado!');
    }
    
    return res.status(200).json(product.rows[0]);

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const createProduct = async (req, res) => {
  const { infoUser } = req;

  const {
    nome,
    estoque,
    categoria,
    preco,
    descricao,
    imagem
  } = req.body;

  const error = handleProducts(nome, estoque, preco, descricao);

  if(error) {
    return res.status(400).json(error);
  }

  try {
    const query = `
      INSERT INTO produtos (
        usuario_id,
        nome,
        estoque,
        categoria,
        preco,
        descricao,
        imagem
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      );
    `
    const newProduct = await connection.query(query, [
      infoUser.id, 
      nome, 
      estoque, 
      categoria, 
      preco, 
      descricao, 
      imagem
    ]);

    if(newProduct.rowCount === 0) {
      return res.status(400).json('Não foi possível cadastrar o produto.');
    }

    return res.status(200).json('Produto cadastrado com sucesso!');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const updateProduct = async (req, res) => {
  const { infoUser } = req;
  const { id } = req.params;

  const { 
    nome,
    estoque,
    categoria,
    preco,
    descricao,
    imagem
  } = req.body;

  try {
    const queryProduct = `
      SELECT *
      FROM produtos
      WHERE usuario_id = $1
      AND id = $2;
    `
    
    const checkProduct = await connection.query(queryProduct, [infoUser.id, id]);

    if(checkProduct.rowCount === 0) {
      return res.status(400).json(`Desculpe, produto com id ${id} não encontrado!`);
    }

    const query = `
      UPDATE produtos
      SET nome = $1,
      estoque = $2,
      categoria = $3,
      preco = $4,
      descricao = $5,
      imagem = $6;
    `

    const updatedProduct = await connection.query(query, [
      nome,
      estoque,
      categoria,
      preco,
      descricao,
      imagem
    ]);

    if(updatedProduct.rowCount === 0) {
      return res.status(400).json(`Não foi possível atualizar o produto com id ${id}, tente novamente!`);
    }

    return res.status(200).json('Produto atualizado com sucesso!');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const deleteProduct = async (req, res) => {
  const { infoUser } = req;
  const { id } = req.params;

  try {
    const queryProduct = `
      SELECT *
      FROM produtos
      WHERE usuario_id = $1
      AND id = $2;
    `

    const checkProduct = await connection.query(queryProduct, [infoUser.id, id]);

    if(checkProduct.rowCount === 0) {
      return res.status(400).json(`Desculpe, produto com id ${id} não encontrado!`);
    }

    const query = `
      DELETE FROM produtos
      WHERE usuario_id = $1
      AND id = $2;
    `

    const deletedProduct = await connection.query(query, [infoUser.id, id]);

    if(deletedProduct.rowCount === 0) {
      return res.status(400).json(`Desculpe, não foi possível excluir o produto com id ${id}, tente novamente!`);
    }

    return res.status(200).json('Produto excluído com sucesso!');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  listAllProducts,
  listProductId,
  createProduct,
  updateProduct,
  deleteProduct
}