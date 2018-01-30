import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Admin} from './admin'
import Login from './login'
import Home from './home'

export const Content = ({match}) => (<Router>
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/comparacaoPoliticos">Comparação Politicos</Link>
      </li>
      <li>
        <Link to="/pesquisasDeVoto">Pesquisas de Voto</Link>
      </li>
      <li>
        <Link to="/login">Login/Cadastro</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>

    <hr/>

    <Route exact="exact" path="/" component={Home}/>
    <Route path="/admin" component={Admin}/>
    <Route path="/login" component={Login}/>
  </div>
</Router>)
