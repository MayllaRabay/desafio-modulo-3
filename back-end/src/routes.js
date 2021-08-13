const express = require('express');
const users = require('./controllers/users');
const products = require('./controllers/products');

const routes = express();

routes.post('/cadastro', users.createUser);
routes.post('/login', users.loginUser);
routes.get('/perfil', users.viewProfile);
routes.put('/perfil', users.updateProfile);

routes.get('/produtos', products.listAllProducts);
routes.get('/produtos/:id', products.listProductId);
routes.post('/produtos', products.createProduct);
routes.put('/produtos/:id', products.updateProduct);
routes.delete('/produtos/:id', products.deleteProduct);

module.exports = routes;