import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {gray900} from 'material-ui/styles/colors';

import axios from 'axios'

const styles = {
  floatingLabelStyle: {
    color: gray900
  },
  underlineStyle: {
    borderColor: gray900
  }
};

export default class VerifyChangePasswordToken extends React.Component {

  constructor(props) {

    super(props)
    console.log(props);
    this.state = {
      token: props.match.params.token,
      senha: '',
      done: false
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  validarErroEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({errorEmail: true})
      return true
    }
    return false
  }

  render() {
    return (this.state.done ? (<SuccessPasswordReser />) : (<div>
      <TextField type="password" floatingLabelStyle={styles.floatingLabelStyle} underlineStyle={styles.underlineStyle} floatingLabelText="Nova senha" onChange={(event, text) => {
          this.setState({senha: text})
        }}/>
      <br />
      <TextField type="password" floatingLabelStyle={styles.floatingLabelStyle} underlineStyle={styles.underlineStyle} floatingLabelText="Confirme a nova senha" onChange={(event, text) => {
          this.setState({senha: text})
        }}/>
      <div>
        <RaisedButton label="Trocar senha" primary={true} onClick={this.changePassword} />
      </div>
    </div>))
  }

  changePassword = () => {
    // const token = this.makeid()
    // console.log(token);
    axios.post('http://localhost:8080/verify-change-password-token', {
      password: this.state.senha,
      token: this.state.token
    })
    .then(function (response) {
      alert('sucesso')
      console.log('Changed Password');
    })
    .catch(function (error) {
        alert('erro')
    })
  }

  handleSuccess = () => {
    this.setState({
      done: true
    })
  }
}

const SuccessPasswordReser = () => (
  <div></div>
)
