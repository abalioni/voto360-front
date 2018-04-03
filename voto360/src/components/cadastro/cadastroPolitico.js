import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {gray900 } from 'material-ui/styles/colors';
import '../../dist/css/meusdados.css'
import SiglaPartido from '../dropdown/siglaPartidos'
import Estados from '../dropdown/estados'
import InputCNPJ from '../inputs/InputCNPJ'

import { cookie } from 'cookie_js'
import axios from 'axios'
import {CPF, CNPJ} from 'cpf_cnpj'

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
          cnpj: '',
          errorCNPJ: false
      }
  
    }

    validarCNPJ = () => {
        if (!CNPJ.isValid(this.state.cnpj)) {
            this.setState({ errorCNPJ: true })
        return true
        }
        return false
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
                    <SiglaPartido />
                    <p>Selectione o Estado:</p>
                    <Estados />
                    <DatePicker 
                        hintText="Data de nascimento" 
                        container="inline" 
                        underlineStyle={styles.underlineStyle} 
                        floatingLabelStyle={styles.floatingLabelStyle}
                        dialogContainerStyle={styles.floatingLabelFocusStyle}/>
                    <InputCNPJ 
                        value={this.state.cnpj}
                        onBlur={this.validarCNPJ}
                        hintText="CNPJ*"
                        floatingLabelText="CNPJ*"
                        underlineStyle={styles.underlineStyle}
                        errorText={this.state.errorCNPJ && "Campo obrigatório"}
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