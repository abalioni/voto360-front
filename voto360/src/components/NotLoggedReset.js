import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import SimpleDialog from './SimpleDialog'

import { cookie } from 'cookie_js'

export default class NotLoggedReset extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: cookie.get('user'),
      users: [],
      email: '',
      novaSenha: '',
      token: '',
      success: false,
      open: false,
    }

  }

  render() {
    return (
        <div>
          <TextField
            hintText="Informe seu email"
            floatingLabelText="Informe seu email"
            onChange={(event, text) =>
            {
                this.setState({email: text})
            }}
          />
        <RaisedButton label="Resetar senha" primary={true} onClick={this.changePassword} />
        <SimpleDialog 
              open={this.state.open} 
              title= {this.state.success ? 'Email Enviado' : 'Algo deu errado'}
              message={this.state.success ? 'Vá ao seu email para continuar o reset de senha' : 'Verifique o email digitado'}
              onRequestClose={()=>{
                this.setState({
                  open: false,
                })
              }}
              />
        </div>
    )
  }

  changePassword = () => {

    axios.post('http://localhost:8080/change-password', {
      email: this.state.email,
    })
    .then(response => {
      this.setState({
        success: true,
        open: true,
      })
    })
    .catch(error => {
        this.setState({
          success: false,
          open:true,
        })
    })
    
  }

}
