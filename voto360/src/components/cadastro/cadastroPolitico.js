import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {gray900 } from 'material-ui/styles/colors';

import { cookie } from 'cookie_js'
import axios from 'axios'
import {CPF} from 'cpf_cnpj'

export default class CadastroPolitico extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        
      }
  
    }

    render() {
        return(<div>Cadastro Politico</div>)
    }
}