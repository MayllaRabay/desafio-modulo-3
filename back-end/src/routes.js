const express = require('express');
const users = require('./controllers/users');
const products = require('./controllers/products');

const routes = express();

routes.post('/cadastro', users.createUser);

module.exports = routes;