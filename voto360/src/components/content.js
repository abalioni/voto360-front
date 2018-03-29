import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Admin} from './admin'
import Login from './login'
import Home from './home'
import Pesquisa from './pesquisaVotos'
import NotLoggedReset from './NotLoggedReset'
import VerifyChangePasswordToken from './VerifyChangePasswordToken'
import CadastroPolitico from './cadastro/cadastroPolitico'
import MeusDados from './meusdados'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

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
    const cookieUser = cookie.get('user');
    let user;
    if(cookieUser){
      user = JSON.parse(cookieUser);
    }
    return (
    <Router>
    <div>
      <Drawer docked={false} width={200} open={this.props.open} onRequestChange={this.props.handleToggle} >
          {user && user.cargo === 'admin' ? undefined : (<Link to="/">
            <MenuItem onClick={this.props.handleClose}>
              Home
            </MenuItem></Link>)}

          {user && user.cargo === 'admin' ? undefined : (<Link to="/comparacaoPoliticos">
            <MenuItem onClick={this.props.handleClose}>
              Comparação Politicos
            </MenuItem>
          </Link>) }
          {user && user.cargo === 'admin' ? undefined : (<Link to="/pesquisasDeVoto">
            <MenuItem onClick={this.props.handleClose}>
              Pesquisas de Voto
            </MenuItem>
          </Link>)}
          {user && user.cargo === 'admin' && <Link to="/admin">
            <MenuItem onClick={this.props.handleClose}>
              Admin
          </MenuItem>
        </Link>}
        {user && user.cargo !== 'admin' ? (<Link to="/meusDados">
          <MenuItem onClick={this.props.handleClose}>
            Meu Perfil
          </MenuItem>
        </Link>) : undefined}
                
        {this.state.isLoggedIn ? null : (<Link to="/login">
          <MenuItem onClick={this.props.handleClose}>
            Login/Cadastro
        </MenuItem></Link>)}
        {this.state.isLoggedIn ? (<button onClick={this.handleLogout}>
          <MenuItem onClick={this.props.handleClose}>
             Logout
        </MenuItem>
        </ button>) : null}
      </Drawer>


      <Route exact path="/" component={Home}/>
      <Route path="/pesquisasDeVoto" component={Pesquisa}/>
      <Route path="/admin" render={(props) => (user && user.cargo === 'admin') ? <Admin {...props} /> : <div></div>} />
      <Route path="/forgotpassword/" component={NotLoggedReset}/>
      <Route path="/login" render={(props) => <Login handleLogin={() => {this.handleLogged(true)}} {...props} />} />
      <Route path="/verify-change-password-token/:token" component={VerifyChangePasswordToken} />
      <Route path="/meusDados" render={(props) => (user && user.cargo !== 'admin') ? <MeusDados {...props} /> : <div></div>} />
      <Route path="/cadastroPolitico" render={(props) => (user && user.cargo !== 'admin') ? <CadastroPolitico {...props} /> : <div></div>} />

    </div>
  </Router>
)}
}

export default Content;
