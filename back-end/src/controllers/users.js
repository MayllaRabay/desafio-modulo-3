const connection = require('../connection');
const handleUsers = require('../utils/handleUsers');
const securePassword = require('secure-password');
const pwd = securePassword();
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const createUser = async (req, res) => {
  const { 
    nome, 
    nome_loja, 
    email, 
    senha 
  } = req.body;

  const error = handleUsers(nome, nome_loja, email, senha);

  if(error) {
    return res.status(400).json(error);
  }

  try {
    const queryEmail = `
      SELECT *
      FROM usuarios
      WHERE email = $1
    `
    const checkDuplicateEmail = await connection.query(queryEmail, [email]);

    if(checkDuplicateEmail.rowCount > 0) {
      return res.status(400).json('O e-mail informado já está cadastrado.');
    }

    const userPassword = Buffer.from(senha);

    const hash = (await pwd.hash(userPassword)).toString('hex');

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
      hash
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

  if(!email) {
    return res.status(400).json("O campo 'email' é obrigatorio!");
  }

  if(!senha) {
    return res.status(400).json("O campo 'senha' é obrigatorio!");
  }

  try {
    const queryEmail = `
      SELECT *
      FROM usuarios
      WHERE email = $1
    `
    const checkUser = await connection.query(queryEmail, [email]);

    if(checkUser.rowCount === 0) {
      return res.status(400).json('E-mail ou senha estão incorretos, tente novamente!');
    }

    const user = checkUser.rows[0];

    const checkUserPassword = await pwd.verify(Buffer.from(senha), Buffer.from(user.senha, 'hex'));

    switch (checkUserPassword) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(400).json('E-mail ou senha estão incorretos, tente novamente!');
      case securePassword.VALID:
        break;
      case securePassword.VALID_NEEDS_REHASH:
        try {
          const userPassword = Buffer.from(senha);
          const hash = (await pwd.hash(userPassword)).toString('hex');
          const query = `
            UPDATE usuarios ( 
            SET senha = $1
            WHERE email = $2;
          `
          await connection.query(query, [hash, email]);
          
        } catch {  
        }
      break;
    }
    
    const token = jwt.sign({
      id: user.id,
      nome: user.nome, 
      nome_loja: user.nome_loja,
      email: user.email
    }, jwtSecret);

    const usuario = {
      id: user.id,
      nome: user.nome, 
      nome_loja: user.nome_loja,
      email: user.email
    };

    return res.status(200).json({usuario, token});

  } catch (error) {
    return res.status(400).json(error.message);
  }
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