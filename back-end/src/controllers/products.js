const connection = require('../connection');

const listAllProducts = async (req, res) => {
  const { infoUser } = req;

  try {
    const query = `
      SELECT * 
      FROM produtos 
      WHERE usuario_id = $1
    `
    const products = await connection.query(query, [infoUser.id]);

    if(products.rowCount === 0) {
      return res.status(404).json('Nenhum produto cadastrado!');
    }
    
    return res.status(200).json(products.rows);

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
      AND id = $2
    `
    const product = await connection.query(query, [infoUser.id, id]);

    if(products.rowCount === 0) {
      return res.status(404).json('Produto não encontrado!');
    }
    
    return res.status(200).json(product.rows[0]);

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const createProduct = async (req, res) => {

}

const updateProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {

}

module.exports = {
  listAllProducts,
  listProductId,
  createProduct,
  updateProduct,
  deleteProduct
}