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
      success: undefined
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
        <RaisedButton label="Enviar email" primary={true} onClick={this.changePassword} />
        </div>
    )
  }

  changePassword = () => {

    axios.post('http://localhost:8080/change-password', {
      email: this.state.email,
    })
    .then(response => {
      this.setState({
        success: true
      })
      console.log('funcionou change token');
      this.handleReturn(true)
    })
    .catch(error => {
        this.setState({
          success: false
        })
      this.handleReturn(false)
    })
    
  }

  handleReturn = (status) =>{
    status ? alert('sucesso') : alert('falhou')
  }

}
