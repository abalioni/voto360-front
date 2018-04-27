import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import { Admin } from './admin'
import Login from './login'
import Home from './home'
import Pesquisa from './pesquisaVotos'
import NotLoggedReset from './NotLoggedReset'
import VerifyChangePasswordToken from './VerifyChangePasswordToken'
import PoliticsRequests from './politicsRequests'
import CadastroPolitico from './cadastro/cadastroPolitico'
import MeusDados from './meusdados'
import FlatButton from 'material-ui/FlatButton';

import { cookie } from 'cookie_js'
const user = cookie.get('user');

class MenuLinks extends Component {
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
        if (user) {
            console.log("logout");
            cookie.remove('user');
        }
        this.handleLogged(false)
    }
    
    renderLink(user = {}) {
        
        if (this.state.isLoggedIn && user.cargo !== 'admin' && user.cargo !== 'editor') {
            return (<Link style={{ textDecoration: 'none' }} to="/meusDados">
            Alterar Cadastro
            </Link>)
        }
        return null
    }
    
    render() {
        const cookieUser = cookie.get('user');
        let user;
        if (cookieUser) {
            user = JSON.parse(cookieUser);
        }
        console.log(cookieUser)
        return (<Router>
            <Switch>
            {user && (user.cargo === 'admin' || user.cargo === 'editor') ? (<Link style={{ textDecoration: 'none' }} to="/">
            Home
            </Link>) : 
            undefined }
            {user && (user.cargo === 'admin' || user.cargo === 'editor') ?  (<Link style={{ textDecoration: 'none' }} to="/comparacaoPoliticos">
            
            Comparação Politicos
            
            </Link>) : 
            (<Link style={{ textDecoration: 'none' }} to="/comparacaoPoliticos">
            
            Comparação Politicos
            
            </Link>)}
            {user && (user.cargo === 'admin' || user.cargo === 'editor') ? undefined : 
            (<Link style={{ textDecoration: 'none' }} to="/pesquisasDeVoto">
            
            Pesquisas de Voto
            
            </Link>)}
            
            {user && user.cargo === 'admin' && <Link style={{ textDecoration: 'none' }} to="/admin">
            
            Admin
            
            </Link>}
            
            
            {user && user.cargo === 'editor' && <Link style={{ textDecoration: 'none' }} to="/PoliticsRequests">
            Aprovar Perfil Politico
            </Link>}
            
            {this.renderLink(user)}
            
            {this.state.isLoggedIn ? null : (<Link style={{ textDecoration: 'none' }} to="/login">
            Login/Cadastro
            </Link>)}
            {this.state.isLoggedIn ? (<FlatButton fullWidth={true} onClick={this.handleLogout}>
                Logout
                </ FlatButton >) : null}
                
                <Route exact path="/" component={Home} />
                <Route path="/pesquisasDeVoto" component={Pesquisa} />
                <Route path="/admin" render={(props) => (user && user.cargo === 'admin') ? <Admin {...props} /> : <div></div>} />
                <Route path="/PoliticsRequests" render={(props) => (user && user.cargo === 'editor') ? <PoliticsRequests {...props} /> : <div></div>} />
                <Route path="/forgotpassword/" component={NotLoggedReset} />
                <Route path="/login" render={(props) => <Login handleLogin={() => { this.handleLogged(true) }} {...props} />} />
                <Route path="/verify-change-password-token/:token" component={VerifyChangePasswordToken} />
                <Route path="/meusDados" render={(props) => (user && user.cargo !== 'admin') ? <MeusDados {...props} /> : <div></div>} />
                <Route path="/cadastroPolitico" render={(props) => (user && user.cargo !== 'admin') ? <CadastroPolitico {...props} /> : <div></div>} />
                </Switch>
                </Router>
            )}
        }
        
        export default MenuLinks;
        