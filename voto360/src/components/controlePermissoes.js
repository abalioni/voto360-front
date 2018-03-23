import React from 'react'
import axios from 'axios'

import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { gray900 } from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import '../dist/css/controlepermissoes.css'

const style = {
  margin: 12,
};

const styles = {
  floatingLabelStyle: {
    color: gray900,
  },
  underlineStyle: {
    borderColor: gray900,
  }
};

export default class ControlePermissoes extends React.Component {

  

  constructor(props) {
    super(props)

    this.state = {
      emails: [],
      users: [],
      emailSelecionado: '',
      cargo: '',
      nome: '',
    }
    this.handleUsers = this.handleUsers.bind(this);
  }

  

  render() {
    return (<div className="outter-div">
    
    <div>
    <h2>Controle Permissoes</h2>
      <div className="inner-div">
        <AutoComplete
          floatingLabelText="Pesquise o usuário por email"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.emails}
          maxSearchResults={10}
          onNewRequest={(text, index) => { 
            this.setState({
              emailSelecionado: text
            })
            this.displayUser()
          }}
        />
        <RaisedButton label="Buscar usuários" primary={true} style={style} onClick={this.getUsuarios}/>
        </div>
        <div className="inner-div">
          <SelectField
            floatingLabelText="Permissões"
            floatingLabelStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
            value={this.state.cargo}
            onChange={this.handleCargo}
          >
            <MenuItem value={"eleitor"} primaryText="Eleitor" />
            <MenuItem value={"politico"} primaryText="Político" />
            <MenuItem value={"editor"} primaryText="Editor" />
            <MenuItem value={"admin"} primaryText="Admin" />
          </SelectField>
          
        </div>
        <div className="inner-div">
          
          {/* <RaisedButton label="Excluir usuário" primary={true} style={style} onClick={this.handleSalvarPermissoes}/> */}
          <RaisedButton label="Salvar" primary={true} style={style} onClick={this.handleSalvarPermissoes}/>
        </div>
      </div>  
        <div className="card">
        {this.state.emailSelecionado ? (<Card>
          <CardHeader
            title="Usuário selecionado"
          />
          <CardText>
            <p>Nome: {this.state.nome}</p>
            <p>Email: {this.state.emailSelecionado}</p>
            <p>Cargo: {this.state.cargo}</p>
          </CardText>
          <CardActions>
            <FlatButton label="Excluir Usuário" />
          </CardActions>
          
        </Card>
        ) : undefined}
            
        </div>
    </div>)
  }

  getUsuarios = () => {
    axios.get('http://localhost:8081/pessoa').then(this.handleUsers).catch(function(error) {
      alert(error);
    });
  }

  handleUsers = (response) => {
 
    this.setState({ emails: response.data.map(d => d.email), users: response.data })
    console.log(this.state.emailSelecionado, "email selecionad")
    
  }

  displayUser = () => {
    this.state.users.forEach((obj, index) => {
      console.log(obj)
      if(obj.email === this.state.emailSelecionado) {
        console.log(obj.nome, "obj nome")
        this.setState({
          cargo: obj.cargo,
          nome: obj.nome
        })
        return
      }
    })  
  }

  handleCargo = (event, index, value) => {
    this.setState({cargo: value})
  };

  handleSalvarPermissoes = () => {

    axios.put('http://localhost:8081/change-role', {
      email: this.state.emailSelecionado,
      cargo: this.state.cargo
    })
    .then(function (response) {
      console.log(response);
    })
    .then(function (error) {
      if (error) {
        console.log(error);
      }
    })

    axios.get('http://localhost:8081/pessoa?q=', {
      email: this.state.emailSelecionado
    })
    .then(function (response) {
      console.log(response);
    })
    .then(function (error) {
      if (error) {
        console.log(error);
      }
    })
}
}