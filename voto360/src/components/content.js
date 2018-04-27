import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Admin} from './admin'
import Login from './login'
import Home from './home'
import Pesquisa from './pesquisaVotos'
import NotLoggedReset from './NotLoggedReset'
import VerifyChangePasswordToken from './VerifyChangePasswordToken'
import PoliticsRequests from './politicsRequests'
import CadastroPolitico from './cadastro/cadastroPolitico'
import MeusDados from './meusdados'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import Subheader from 'material-ui/Subheader';

import { cookie } from 'cookie_js'

// export class Content = ({match, isLoggedIn}) => {
class Content extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isLoggedIn: cookie.get('user')
    }
    
    this.handleLogout = this.handleLogout.bind(this)
    this.renderLink = this.renderLink.bind(this)
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
  
  renderLink(user = {}) {
    
    if (this.state.isLoggedIn && user.cargo !== 'admin' && user.cargo !== 'editor') {
      return (<Link style={{ textDecoration: 'none' }} to="/meusDados">
      <MenuItem onClick={this.props.handleClose}>
      Alterar Cadastro
      </MenuItem>
      </Link>)
    }
    return null
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
      <Drawer width={200} open={this.state.open} onRequestChange={this.props.handleToggle} >
      
      <Divider />
      <Subheader>Encontre um Político</Subheader>
      {user && (user.cargo === 'admin' || user.cargo === 'editor') ? undefined : (<Link style={{textDecoration: 'none'}} to="/">
      
      <MenuItem onClick={this.props.handleClose}>
      {/* <SvgIcon {...this.props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon> */}
    Home
    </MenuItem></Link>)}
    
    
    {user && (user.cargo === 'admin'|| user.cargo === 'editor') ? undefined : (<Link style={{textDecoration: 'none'}} to="/comparacaoPoliticos">
    <MenuItem onClick={this.props.handleClose}>
    Comparação Politicos
    </MenuItem>
    </Link>) }
    
    <Subheader></Subheader>
    {user && (user.cargo === 'admin' || user.cargo === 'editor') ? undefined : (<Link style={{textDecoration: 'none'}} to="/pesquisasDeVoto">
    <MenuItem onClick={this.props.handleClose}>
    Pesquisas de Voto
    </MenuItem>
    </Link>)}
    
    <Divider />
    
    {user && user.cargo === 'admin' && <Link style={{textDecoration: 'none'}} to="/admin">
    <MenuItem onClick={this.props.handleClose}>
    Admin
    </MenuItem>
    </Link>}
    
    <Divider />
    
    {user && user.cargo === 'editor' && <Link style={{textDecoration: 'none'}} to="/PoliticsRequests">
    <MenuItem onClick={this.props.handleClose}>
    Aprovar Perfil Politico
    </MenuItem>
    </Link>}
    
    <Divider />
    <Subheader>Meu perfil</Subheader>
    { this.renderLink(user) }
    
    {this.state.isLoggedIn ? null : (<Link style={{textDecoration: 'none'}} to="/login">
    <MenuItem onClick={this.props.handleClose}>
    Login/Cadastro
    </MenuItem></Link>)}
    {this.state.isLoggedIn ? (<FlatButton fullWidth={true} onClick={this.handleLogout}>
      <MenuItem onClick={this.props.handleClose}>
      Logout
      </MenuItem>
      </ FlatButton >) : null}
      </Drawer>
      
      
      <Route exact path="/" component={Home}/>
      <Route path="/pesquisasDeVoto" component={Pesquisa}/>
      <Route path="/admin" render={(props) => (user && user.cargo === 'admin') ? <Admin {...props} /> : <div></div>} />
      <Route path="/PoliticsRequests" render={(props) => (user && user.cargo === 'editor') ? <PoliticsRequests {...props} /> : <div></div>} />
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
  