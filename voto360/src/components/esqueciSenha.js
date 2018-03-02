import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { cookie } from 'cookie_js'



export default class EsqueciSenha extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: cookie.get('user')
    }
    this.handleUserSession = this.handleUserSession.bind(this)
  }

  render() {
    return (
      this.handleUserSession ? (<LoggedReset />) : (<NotLoggedReset />)
    )
  }

  handleUserSession () {
    const user = cookie.get('user');

    if(user){
      console.log(user);
      this.setState(
        {
          user: user
        }
      )
      return true
    } else {
      console.log(user);
      return false
    }
  }
}

const NotLoggedReset = () => (
  <div>
    <TextField
      hintText="Informe seu email"
      floatingLabelText="Informe seu email"
    />
    <RaisedButton label="Enviar email" primary={true} />
  </div>
)

const LoggedReset = () => (
  <div>
    <TextField
      hintText="Senha atual"
      floatingLabelText="Senha atual"
    />
    <TextField
      hintText="Nova senha"
      floatingLabelText="Nova senha"
    />
    <TextField
      hintText="Confirme a nova senha"
      floatingLabelText="Confirme a nova senha"
    />
    <RaisedButton label="Alterar senha" primary={true} />
  </div>
)
