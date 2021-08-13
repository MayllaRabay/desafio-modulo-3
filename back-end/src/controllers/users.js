const connection = require('../connection');

const createUser = async (req, res) => {
  const { 
    nome, 
    nome_loja, 
    email, 
    senha 
  } = req.body;

  try {
    const query = `INSERT INTO usuarios ( 
      nome, 
      nome_loja, 
      email, 
      senha
    ) VALUES (
      $1,
      $2,
      $3,
      $4
    );`

    const user = await connection.query(query, [
      nome, 
      nome_loja, 
      email, 
      senha
    ]);

    if (user.rowCount === 0) {
      return res.status(400).json('Não foi possível cadastrar o usuário.');
    }

    return res.status(200).json('Usuário cadastrado com sucesso!');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const loginUser = async (req, res) => {
  const {
    email,
    senha
  } = req.body;


}

const viewProfile = async (req, res) => {

}

const updateProfile = async (req, res) => {

}

module.exports = {
  createUser,
  loginUser,
  viewProfile,
  updateProfile
};