const connection = require('../connection');

const createUser = async (req, res) => {
  const { 
    nome, 
    nome_loja, 
    email, 
    senha 
  } = req.body;

  try {
    const query = `
      INSERT INTO usuarios ( 
        nome, 
        nome_loja, 
        email, 
        senha
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      );
    `

    const user = await connection.query(query, [
      nome, 
      nome_loja, 
      email, 
      senha
    ]);

    if (user.rowCount === 0) {
      return res.status(400).json('Não foi possível cadastrar o usuário, tente novamente!');
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
  const { infoUser } = req;

  try {
    const query = `
      SELECT *
      FROM usuarios
      WHERE id = $1;
    `
    const { rows : user } = await connection.query(query, [infoUser.id]);
    const { senha, ...profile} = user[0];

    return res.status(200).json(profile);

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const updateProfile = async (req, res) => {
  const { infoUser } = req;

  const { 
    nome, 
    nome_loja, 
    email, 
    senha
  } = req.body;

  try {
    const queryEmail = `
      SELECT *
      FROM usuarios
      WHERE email = $1
      AND id <> $2;
    `
    const checkDuplicateEmail = await connection.query(queryEmail, [email, infoUser.id]);

    if(checkDuplicateEmail.rowCount > 0) {
      return res.status(400).json('Não foi possível atualizar seu perfil. O e-mail informado já está cadastrado.');
    }

    const query = `
      UPDATE usuarios
      SET nome = $1,
      nome_loja = $2,
      email = $3,
      senha = $4
      WHERE id = $5;
    `
    const updatedProfile = await connection.query(query, [
      nome,
      nome_loja,
      email,
      senha,
      infoUser.id
    ]);

    if(updatedProfile.rowCount === 0) {
      return res.status(400).json('Não foi possível atualizar seu perfil, tente novamente!');
    }

    return res.status(200).json('Perfil atualizado com sucesso!');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  createUser,
  loginUser,
  viewProfile,
  updateProfile
};