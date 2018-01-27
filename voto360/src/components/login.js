import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import styles from '../dist/css/login.css'

import axios from 'axios'
import { CPF } from 'cpf_cnpj'

export default class Login extends React.Component {
  render() {
    return <TabsLogin />
  }
}

const CardLogin = () => (
  <div className="cardLogin">
    <LoginFields />
    <RaisedButtonLogin/>
  </div>
)

 class CardCadastro extends React.Component {

   constructor(props){
     super(props)
     this.state = {
       email: '',
       nome: '',
       senha: '',
       confirmarsenha: '',
       cpf: '',

       errorSenha: false,
       errorEmail: false,
       errorCPF: false
     }
   }

   validarErroSenha = () => {
     if(this.state.senha !== this.state.confirmarsenha){
       this.setState({errorSenha: true})
       return true
     }
     return false
   }

    validarErroEmail = () => {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.state.email)){
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

   signUp = () => {

     //Valida senha
     if(this.validarErroSenha){
       return;
     }

     //Valida Email
     if(this.validarErroEmail){
       return;
     }
     //Valida cpf
     if(this.validarErroCPF){
       return;
     }


     var request = {
       nome: this.state.nome,
       cpf: this.state.cpf,
       senha: this.state.senha,
       email: this.state.email
     };

     axios.post('http://localhost:8080/pessoa',request)
     .then(function (response) {
       alert(JSON.stringify(response));
     })
     .catch(function (error) {
       alert(error);
     });

   }

  render(){
    return(
    <div className="cardLogin">
      <div className="tabsInside">
        <TextField onBlur={this.validarErroEmail} errorText={this.state.errorEmail && "Confirme o email digitado"} floatingLabelText="Email" onChange={(event, text)=>{this.setState({email: text, errorEmail: false})}}/>
        <TextField floatingLabelText="Nome Completo" onChange={(event, text)=>{this.setState({nome: text})}}/>
        <TextField onBlur={this.validarErroSenha} floatingLabelText="Senha" type="password" onChange={(event, text)=>{this.setState({senha: text, errorSenha: false})}}/>
        <TextField onBlur={this.validarErroSenha} errorText={this.state.errorSenha && "Confirme as senhas digitadas"} floatingLabelText="Confirmar Senha" type="password" onChange={(event, text)=>{this.setState({confirmarsenha: text, errorSenha: false})}}/>
        <TextField onBlur={this.validarCPF} errorText={this.state.errorCPF && "Confirme o CPF digitado"} floatingLabelText="CPF" onChange={(event, text)=>{this.setState({cpf: text, errorCPF: false})}}/>
      </div>
      <RaisedButtonCadastro handleClick={this.signUp}/>
    </div>
  )
}
}

const RaisedButtonLogin = () => (
    <RaisedButton label="Login" primary={true} />
);

const RaisedButtonCadastro = (props) => (
    <RaisedButton label="Cadastro" className="marginBottom20 marginTop20" onClick={props.handleClick}/>
);

const LoginFields = () => (
  <div className="tabsInside">
    <TextField floatingLabelText="Email" />
    <TextField floatingLabelText="Senha" type="password"/>
  </div>
)

const TabsLogin = () => (
  <Tabs className="tabsLogin">
    <Tab label="Login">
        <CardLogin/>
    </Tab>
    <Tab label="Cadastro">
      <CardCadastro/>
    </Tab>
  </Tabs>
);
