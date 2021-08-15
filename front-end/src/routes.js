import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

function Routes() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/cadastro' component={Register} />
      <Route path='/produtos' component={Products} />
    </ Router>
  );
}

export default Routes;