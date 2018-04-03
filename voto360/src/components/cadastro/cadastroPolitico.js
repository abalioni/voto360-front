import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {gray900 } from 'material-ui/styles/colors';
import '../../dist/css/cadastroPolitico.css';
import SiglaPartido from '../dropdown/siglaPartidos';
import Estados from '../dropdown/estados';
import InputCNPJ from '../inputs/InputCNPJ';

import { cookie } from 'cookie_js';
import axios from 'axios';
import { CNPJ } from 'cpf_cnpj';

const styles = {
  errorStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  },
  floatingLabelStyle: {
    color: gray900,
  },
  floatingLabelFocusStyle: {
    color: gray900,
  },
};

export default class CadastroPolitico extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        user: '',
        newemail: '',
        email: '',
        nome: '',
        senhaatual: '',
        novasenha: '',
        confirmarsenha: '',
        cpf: '',
        cnpj: '',

        errorCNPJ: false,
        errorSenha: false,
        errorSenhaAtual: false,
        errorEmail: false,
        errorCPF: false,
        errorNome: false,
                    
      }
  
    }

    componentWillMount() {
        const cookieUser = cookie.get('user');
        let user;
        if (cookieUser) {
            user = JSON.parse(cookieUser);
            console.log(user)
            this.setState({
                nome: user.nome,
                email: user.email,
                newemail: user.email,
                cpf: user.cpf
            })
        }
    }

    validarCNPJ = () => {
        if (!CNPJ.isValid(this.state.cnpj)) {
            this.setState({ errorCNPJ: true })
        return true
        }
        return false
    }

    validarErroEmail = () => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.state.newemail)) {
            this.setState({ errorEmail: true })
            return true
        }
        return false
    }

    validarErroNome = () => {
        if (this.state.nome === '') {
            this.setState({ errorNome: true })
            return true
        }
        return false
    }

    changeInfo = () => {
    
    //Valida Email
    if (this.validarErroEmail()) {
      return;
    }

    //Valida cpf
        if (this.validarCNPJ()) {
      return;
    }

    if (this.validarErroNome()) {
      return;
    }


    var request = {};

    // email: this.state.email,
    // newemail: this.state.newemail,
    // cpf: this.state.cpf,
    // senha: this.state.senha,
    // nome: this.state.nome

    if (this.state.email) {
      request.email = this.state.email
    }

    if (this.state.newemail) {
      request.newemail = this.state.newemail
    }

    if (this.state.cpf) {
      request.cpf = this.state.cpf
    }

    if (this.state.senhaatual) {
      request.senhaatual = this.state.senhaatual
    }

    if (this.state.novasenha) {
      request.senha = this.state.novasenha
    }

    if (this.state.nome) {
      request.nome = this.state.nome
    }

    axios.post('http://localhost:8081/politico', request)
      .then(this.handleChangeSuccess)
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      })
  }

    render() {
        return (<div className="card-div">
            <Card className="user-card-container">
                <CardTitle title="Solicitar cadastro político" className="card-title" />
                <div className="user-card-info">
                    <TextField
                        value={this.state.nome}
                        onBlur={this.validarErroNome}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        underlineStyle={styles.underlineStyle}
                        errorText={this.state.errorNome && "Campo obrigatório"}
                        floatingLabelText="Nome Eleitoral*"
                        onChange={(event, text) => {
                            this.setState({ nome: text, errorNome: false })
                        }}
                    />
                    <TextField
                        value={this.state.newemail}
                        onBlur={this.validarErroEmail}
                        hintText="Email Eleitoral*"
                        floatingLabelText="Email Eleitoral*"
                        underlineStyle={styles.underlineStyle}
                        errorText={this.state.errorEmail && "Campo obrigatório"}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={(event, text) => {
                        this.setState({ newemail: text, errorEmail: false })
                        }}
                    />
                    <p>Selectione o Partido:</p>
                    <SiglaPartido className="partido-dropdown" />
                    <p>Selectione o Estado:</p>
                    <Estados />
                    <p>Selecione a data de nascimento:</p>
                    <DatePicker 
                        hintText="Data de nascimento" 
                        container="inline" 
                        underlineStyle={styles.underlineStyle} 
                        textFieldStyle={styles.floatingLabelStyle}
                        dialogContainerStyle={styles.floatingLabelFocusStyle}
                        />
                    <InputCNPJ 
                        value={this.state.cnpj}
                        onBlur={this.validarCNPJ}
                        hintText="CNPJ*"
                        floatingLabelText="CNPJ*"
                        underlineStyle={styles.underlineStyle}
                        errorText={this.state.errorCNPJ && "Verifique o valor digitado"}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={(event, text) => {
                            this.setState({ cnpj: text, errorCNPJ: false })
                        }}/>
                    <TextField
                        hintText="Biografia"
                        floatingLabelText="Biografia"
                        multiLine={true}
                        rows={2}
                        rowsMax={50}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                </div>
                <div className="buttons">
                    <CardActions className="card-actions">
                        <RaisedButton label="Salvar" primary={true} fullWidth={true} onClick={this.changeInfo} />
                    </CardActions>
                </div>
            </Card></div>)
    }
}