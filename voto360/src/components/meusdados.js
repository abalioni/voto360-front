import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { gray900 } from 'material-ui/styles/colors';
import RequestPoliticsProfileDialog from './dialogs/requestPoliticsProfileDialog'

import { cookie } from 'cookie_js'
import axios from 'axios'
import { CPF } from 'cpf_cnpj'

import '../dist/css/meusdados.css'


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

export default class MeusDados extends React.Component {
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

      errorSenha: false,
      errorEmail: false,
      errorCPF: false,
      errorNome: false,
      open: false
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

  validarErroSenha = () => {
    if (!this.state.novasenha || this.state.novasenha !== this.state.confirmarsenha || this.state.senhaatual === this.state.novasenha) {
      this.setState({ errorSenha: true })
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

  validarCPF = () => {
    if (!CPF.isValid(this.state.cpf)) {
      this.setState({ errorCPF: true })
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

  handleChangeSuccess = () => {
    alert("Sucesso");
    axios.get(`http://localhost:8081/pessoa?q={"email":"${this.state.newemail}"}`)
      .then(function (response) {
        console.log(response);
        cookie.set({
          user: JSON.stringify(response.data[0])
        });
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      })



  }

  handleSignUpFailure = (response) => {
    const cookieUser = cookie.get('user');
    let user;
    if (cookieUser) {
      user = JSON.parse(cookieUser);
      console.log(user)
      this.setState({
        nome: user.nome,
        email: user.email,
        newemail: user.email,
        cpf: user.cpf,
      })
    }
  }

  validaSenhaAlterada = () => {

    if (this.state.novasenha) {
      this.setState({ senha: this.state.novasenha })
    }
    return;
  }

  validaEmailAlterado = () => {

    if (this.state.newemail && (this.state.newemail !== this.state.email)) {
      this.setState({ email: this.state.newemail })
    } else {
      this.setState({ email: this.state.email })
    }
    return;
  }

  changeInfo = () => {
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

    axios.put('http://localhost:8081/change-info', request)
      .then(this.handleChangeSuccess)
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      })
  }

  requestPoliticsProfile = () => {
    this.setState({
      open: true
    })
  }

  render() {
    return (<div className="card-div">
      <Card className="user-card-container">
        <CardTitle title="Meus dados" className="card-title" />
        <div className="user-card-info">
          <TextField
            value={this.state.nome}
            onBlur={this.validarErroNome}
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorNome && "Campo obrigatório"}
            floatingLabelText="Nome Completo*"
            onChange={(event, text) => {
              this.setState({ nome: text, errorNome: false })
            }}
          />
          <TextField
            value={this.state.newemail}
            onBlur={this.validarErroEmail}
            hintText="Email*"
            floatingLabelText="Email*"
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorEmail && "Campo obrigatório"}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onChange={(event, text) => {
              this.setState({ newemail: text, errorEmail: false })
            }}
          />
          <TextField
            value={this.state.cpf}
            onBlur={this.validarCPF}
            hintText="CPF*"
            floatingLabelText="CPF*"
            underlineStyle={styles.underlineStyle}
            errorText={this.state.errorCPF && "Campo obrigatório"}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            onChange={(event, text) => {
              this.setState({ cpf: text, errorCPF: false })
            }}
          />
          <TextField
            value={this.state.senhaatual}
            onBlur={this.validarErroSenha}
            hintText="Senha atual*"
            floatingLabelText="Senha atual*"
            underlineStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            type="password"
            onChange={(event, text) => {
              this.setState({ senhaatual: text, errorNome: false })
            }}
          />
          <TextField
            value={this.state.novasenha}
            onBlur={this.validarErroSenha}
            hintText="Nova senha"
            floatingLabelText="Nova senha"
            underlineStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            type="password"
            onChange={(event, text) => {
              this.setState({ novasenha: text, errorNome: false })
            }}
          />
          <TextField
            value={this.state.confirmarsenha}
            onBlur={this.validarErroSenha}
            hintText="Confirmar nova senha"
            floatingLabelText="Confirmar Nova senha"
            underlineStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}
            type="password"
            onChange={(event, text) => {
              this.setState({ confirmarsenha: text, errorNome: false })
            }}
          />
        </div>
        <div className="buttons">
          <CardActions className="card-actions">
            <RaisedButton label="Solicitar Perfil Politico" primary={true} fullWidth={false} onClick={this.requestPoliticsProfile} />
            <RaisedButton label="Salvar" primary={true} fullWidth={false} onClick={this.changeInfo} />
          </CardActions>
        </div>
      </Card>
      <RequestPoliticsProfileDialog
        open={this.state.open}
        title="Solicitação de Perfil de Político"
        message="Tem certeza? Apenas um políticos podem solicitar esse tipo de perfil. Ao continuar você irá fornecer as informações necessárias para obter um perfil de político."
        onRequestClose={() => {
          this.setState({
            open: false,
          })
        }}
      />
    </div>
    )
  }
}
