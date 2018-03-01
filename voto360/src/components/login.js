import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import styles from '../dist/css/login.css'

// import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import axios from 'axios'
import {CPF} from 'cpf_cnpj'
import {cookie} from 'cookie_js'

export default class Login extends React.Component {
  render() {
    return <TabsLogin { ...this.props }/>
  }
}

class CardLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: ''
    }
  }

  validarErroSenha = () => {
    if (!this.state.senha) {
      this.setState({errorSenha: true})
      return true
    }
    return false
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({errorEmail: true})
      return true
    }
    return false
  }

  handleSignInSuccess = (response) => {
    cookie.set({
      user: JSON.stringify(response.data)
    });
    if (this.props.location.state.referrer) {
      this.props.history.push(this.props.location.state.referrer)
    }
    this.props.handleLogin()
  }

  signIn = () => {
    if (this.validarErroSenha()) {
      return;
    }

    //Valida Email
    if (this.validarErroEmail()) {
      return;
    }

    var request = {
      senha: this.state.senha,
      email: this.state.email
    };

    axios.post('http://localhost:8080/login', request).then(this.handleSignInSuccess).catch(function(error) {
      alert(error);
    });

  }

  render() {
    return (<div className="cardLogin">

      <div className="tabsInside">
        <TextField onBlur={this.validarErroEmail} errorText={this.state.errorEmail && "Confirme o email digitado"} floatingLabelText="Email" onChange={(event, text) => {
            this.setState({email: text, errorEmail: false})
          }}/>
        <TextField onBlur={this.validarErroSenha} floatingLabelText="Senha" type="password" onChange={(event, text) => {
            this.setState({senha: text, errorSenha: false})
          }}/>
      </div>

      <RaisedButtonLogin handleClick={this.signIn}/>
      <ForgotPassword/>
    </div>)
  }
}

class CardCadastro extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      nome: '',
      senha: '',
      confirmarsenha: '',
      cpf: '',
      cargo: 'eleitor',

      errorSenha: false,
      errorEmail: false,
      errorCPF: false
    }
  }

  validarErroSenha = () => {
    if (this.state.senha !== this.state.confirmarsenha) {
      this.setState({errorSenha: true})
      return true
    }
    return false
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({errorEmail: true})
      return true
    }
    return false
  }

  validarCPF = () => {
    if (!CPF.isValid(this.state.cpf)) {
      this.setState({errorCPF: true})
      return true
    }
    return false
  }

  handleSignUpSuccess = (response) => {
    alert("Sucesso");
    this.setState({
      email: '',
      nome: '',
      senha: '',
      confirmarsenha: '',
      cpf: '',

      errorSenha: false,
      errorEmail: false,
      errorCPF: false
    });
  }

  signUp = () => {

    //Valida senha
    if (this.validarErroSenha()) {
      return;
    }

    //Valida Email
    if (this.validarErroEmail()) {
      return;
    }
    //Valida cpf
    if (this.validarCPF()) {
      return;
    }

    var request = {
      nome: this.state.nome,
      cpf: this.state.cpf,
      senha: this.state.senha,
      email: this.state.email,
      cargo: this.state.cargo
    };

    axios.post('http://localhost:8080/pessoa', request).then(this.handleSignUpSuccess).catch(function(error) {
      alert(error);
    });

  }

  render() {
    return (<div className="cardLogin">
      <div className="tabsInside">

        <TextField value={this.state.email} onBlur={this.validarErroEmail} errorText={this.state.errorEmail && "Confirme o email digitado"} floatingLabelText="Email*" onChange={(event, text) => {
            this.setState({email: text, errorEmail: false})
          }}/>
        <TextField value={this.state.nome} floatingLabelText="Nome Completo" onChange={(event, text) => {
            this.setState({nome: text})
          }}/>
        <TextField value={this.state.senha} onBlur={this.validarErroSenha} floatingLabelText="Senha*" type="password" onChange={(event, text) => {
            this.setState({senha: text, errorSenha: false})
          }}/>
        <TextField value={this.state.confirmarsenha} onBlur={this.validarErroSenha} errorText={this.state.errorSenha && "Confirme as senhas digitadas"} floatingLabelText="Confirmar Senha*" type="password" onChange={(event, text) => {
            this.setState({confirmarsenha: text, errorSenha: false})
          }}/>
        <TextField value={this.state.cpf} onBlur={this.validarCPF} errorText={this.state.errorCPF && "Confirme o CPF digitado"} floatingLabelText="CPF*" onChange={(event, text) => {
            this.setState({cpf: text, errorCPF: false})
          }}/>
      </div>
      <RaisedButtonCadastro handleClick={this.signUp}/>

    </div>)
  }
}

const RaisedButtonLogin = (props) => (<RaisedButton label="Login" primary={true} onClick={props.handleClick}/>);

const RaisedButtonCadastro = (props) => (<RaisedButton label="Cadastro" className="marginBottom20 marginTop20" onClick={props.handleClick}/>);

const TabsLogin = (props) => (<Tabs className="tabsLogin">
  <Tab label="Login">
    <CardLogin {...props}/>
  </Tab>
  <Tab label="Cadastro">
    <CardCadastro/>
  </Tab>
</Tabs>);

const ForgotPassword = () => (<div>
  <a href="/login">Esqueci a senha</a>
</div>);
