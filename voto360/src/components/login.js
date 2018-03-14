import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import '../dist/css/login.css'
import { gray900 } from 'material-ui/styles/colors';
import InputCPF from './InputCPF';
import SimpleDialog from './SimpleDialog'
import DialogResetPassword from './DialogResetPassword';

import axios from 'axios'
import {CPF} from 'cpf_cnpj'
import {cookie} from 'cookie_js'



export default class Login extends React.Component {
  render() {
    return <TabsLogin { ...this.props }/>
  }
}

const styles = {
  floatingLabelStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  }
};

class CardLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: '',
      success: false,
      open: false
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
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    if (!this.props.location.state) {
      this.props.history.push('/')
    }

    if (this.props.location.state && this.props.location.state.referrer) {
      this.props.history.push(this.props.location.state.referrer)
    }
    this.props.handleLogin()
  }

  handleSignInFailure = (response) => {
    console.log('falhou');
    return (<SimpleDialog />)
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

    axios.post('http://localhost:8080/login', request)
    .then(this.handleSignInSuccess)
    .catch(this.handleSignInFailure);

  }

  render() {
    return (<div className="cardLogin">

      <div className="tabsInside">
        <TextField
          onBlur={this.validarErroEmail}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorEmail && "Verifique o email digitado"}
          floatingLabelText="Email"
          onChange={(event, text) =>
            {
              this.setState({email: text, errorEmail: false})
            }}/>
        <TextField
          onBlur={this.validarErroSenha}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          floatingLabelText="Senha"
          type="password"
          onChange={(event, text) =>
            {
              this.setState({senha: text, errorSenha: false})
            }}/>
      </div>

      <RaisedButtonLogin handleClick={this.signIn}/>
      <button onClick={() => this.setState({
        open: true
      })}>Esqueci a Senha</button>
      <DialogResetPassword 
        open={this.state.open} 
        message={this.state.success ? 'Vá ao seu email para continuar o reset de senha' : 'Verifique o email digitado'}
        onRequestClose={()=>{
          this.setState({
            open: false,
          })
        }}
      />
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
      senha_antiga: '',

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
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  handleSignUpFailure = (response) => {
    alert("Erro");
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
      cargo: this.state.cargo,
      token_senha: '',
      senha_antiga: this.state.senha
    };

    axios.post('http://localhost:8080/pessoa', request).then(this.handleSignUpSuccess).catch(function(error) {
      alert(error);
    });

  }


  render() {
    return (<div className="cardLogin">
      <div className="tabsInside">

        <TextField
          value={this.state.email}
          onBlur={this.validarErroEmail}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorEmail && "Confirme o email digitado"}
          floatingLabelText="Email*"
          onChange={(event, text) => {
            this.setState({email: text, errorEmail: false})
          }}/>
        <TextField
          value={this.state.nome}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          floatingLabelText="Nome Completo"
          onChange={(event, text) => {
            this.setState({nome: text})
          }}/>
        <InputCPF
          value={this.state.cpf}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorCPF && "Confirme o CPF digitado"}
          floatingLabelText="CPF*"
          onChange={(event, text) => {
            this.setState({cpf: text, errorCPF: false})
          }}
        />
        <TextField
          value={this.state.senha}
          onBlur={this.validarErroSenha}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          floatingLabelText="Senha*"
          type="password"
          onChange={(event, text) => {
            this.setState({senha: text, errorSenha: false})
          }}/>
        <TextField
          value={this.state.confirmarsenha}
          onBlur={this.validarErroSenha}
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          errorText={this.state.errorSenha && "Confirme as senhas digitadas"}
          floatingLabelText="Confirmar Senha*"
          type="password"
          onChange={(event, text) => {
            this.setState({confirmarsenha: text, errorSenha: false})
          }}/>

      </div>
      <RaisedButtonCadastro handleClick={this.signUp}/>
      
    </div>)
  }
}

const RaisedButtonLogin = (props) => (<RaisedButton label="Login" primary={true} onClick={props.handleClick}/>);

const RaisedButtonCadastro = (props) => (<RaisedButton label="Cadastro" primary={true} className="marginBottom20 marginTop20" onClick={props.handleClick}/>);

const TabsLogin = (props) => (<Tabs className="tabsLogin">
  <Tab label="Login">
    <CardLogin {...props}/>
  </Tab>
  <Tab label="Cadastro">
    <CardCadastro/>
  </Tab>
</Tabs>);
