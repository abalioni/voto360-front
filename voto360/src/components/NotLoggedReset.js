import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'

import { cookie } from 'cookie_js'

export default class NotLoggedReset extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: cookie.get('user'),
      users: [],
      email: '',
      novaSenha: '',
      exists: ''
    }
    this.handleReset = this.handleReset.bind(this)
    this.getUsuario = this.getUsuario.bind(this);
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
          <RaisedButton label="Enviar email" primary={true} onClick={this.handleReset} />
        </div>
    )
  }

  handleReset () {
      const exists = this.getUsuario()
      console.log('exists', exists);
  }

  getUsuario = () => {
      console.log(this.state.email);
      axios.get('http://localhost:8081/singlePerson', {
        email: this.state.email
      })
      .then(function (response) {
          console.log(response);
          this.setState({exists: true})
        console.log(response);
      })
      .then(function (error) {
            this.setState({exists: false})
      })}
  }
