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
    this.handleReset = this.handleReset.bind(this)
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
        <RaisedButton label="Enviar email" primary={true} onClick={this.handleReset} />
        </div>
    )
  }

  handleReset () {
      this.getUsuario()
  }

  getUsuario = () => {
    var request = {
      email: this.state.email
    };

    axios.post('http://localhost:8080/singlePerson', request).then(this.startPasswordReset).catch(function(error) {
      alert(error);
    });
  }

  startPasswordReset = () => {
    this.saveToken()
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

    var request = {
      email: this.state.email,
      token: token
    };

    axios.put('http://localhost:8080/change-token', {
      email: this.state.email,
      token: token
    })
    .then(function (response) {
      this.sendMail(token)
    })
    .then(function (error) {
      if (error) {
        console.log(error);
      }
    })

  }

  sendEmail = (token) => {
    var request = {
      to: this.state.email,
      from: this.state.cpf,
      subject: 'reset de senha',
      url: 'http://localhost:8080/sendMail'+ token,
    };

    axios.post('http://localhost:8080/sendMail', request).then(this.handleSignUpSuccess).catch(function(error) {
      alert(error);
    });
  }


}
