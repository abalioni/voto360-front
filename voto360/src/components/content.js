import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Admin} from './admin'
import Login from './login'
import Home from './home'
import Pesquisa from './pesquisaVotos'

import { cookie } from 'cookie_js'


// export class Content = ({match, isLoggedIn}) => {
class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: cookie.get('user')
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogged(isLoggedIn) {
    this.setState({
      isLoggedIn
    })
  }

  handleLogout() {
    const user = cookie.get('user');

    if(user){
      console.log("logout");
       cookie.remove('user');

    }
    this.handleLogged(false)
  }

  render() {

    return (
    <Router>
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
        {this.state.isLoggedIn ? null : (<li>
          <Link to="/login">Login/Cadastro</Link>
        </li>)}
        {this.state.isLoggedIn ? (<li>
          <button onClick={this.handleLogout}> Logout </ button>
        </li>) : null}
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>

      <Route exact="exact" path="/" component={Home}/>
      <Route path="/pesquisasDeVoto" component={Pesquisa}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/login" render={(props) => <Login handleLogin={() => {this.handleLogged(true)}} {...props} />} />

    </div>
  </Router>
)}
}

export default Content;
