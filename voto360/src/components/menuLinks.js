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

import '../dist/css/menuLinks.css'

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
        return (
            <div className="link-container">
            
            {this.state.isLoggedIn ? null : (<Link style={{ textDecoration: 'none' }} to="/login">
            Login/Cadastro
            </Link>)}
            {this.state.isLoggedIn ? (<FlatButton onClick={this.handleLogout}>
                Logout
                </ FlatButton >) : null}

            </div>
            )}
        }
        
        export default MenuLinks;
        