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
      token: ''
    }

    this.getUsuario = this.getUsuario.bind(this)
    this.saveToken = this.saveToken.bind(this)

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
        <RaisedButton label="Enviar email" primary={true} onClick={this.getUsuario} />
        </div>
    )
  }

  getUsuario = () => {

    axios.get('http://localhost:8080/pessoa?q=', {
      email: this.state.email
    })
    .then(() => this.saveToken())
    .then(function (error) {
      if (error) {
        console.log(error);
      }
    })
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.setState({
      token: text
    })
    return text;
  }

  saveToken = () => {
    const token = this.makeid()
    console.log(token);
    axios.put('http://localhost:8080/change-token', {
      email: this.state.email,
      token: token
    })
    .then(function (response) {
      console.log('funcionou change token');
      console.log(response);
    })
    .then(function (error) {
      if (error) {
        console.log(error);
      }
    })

  }



}
