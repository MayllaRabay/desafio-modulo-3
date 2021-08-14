const connection = require('../connection');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const authToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(404).json('Token não informado.');
  }

  try {
    const token = authorization.replace('Bearer', '').trim();

    const { id } = jwt.verify(token, jwtSecret);
    const query = `
      SELECT *
      FROM usuarios
      WHERE id = $1; 
    `

    const validateUser = await connection.query(query, [id]);

    if(validateUser.rowCount === 0) {
      return res.status(404).json('Usuário não encontrado!')
    }

    const {senha, ...infoUser} = validateUser.rows[0];

    req.infoUser = infoUser;

    next();

  } catch (error) {
    return res.status(400).json(errer.message);
  }
}

module.exports = authToken;