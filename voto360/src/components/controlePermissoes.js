import React from 'react'
import axios from 'axios'

import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { gray900 } from 'material-ui/styles/colors';


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
      users: [],
      emailSelecionado: '',
      cargo: ''
    }
    this.handleUsers = this.handleUsers.bind(this);
  }

  

  render() {
    return (<div className="outter-div">
    <h2>Controle Permissoes</h2>
      <div className="inner-div">
        <AutoComplete
          floatingLabelText="Pesquise o usuário por email"
          floatingLabelStyle={styles.floatingLabelStyle}
          underlineStyle={styles.underlineStyle}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.users}
          maxSearchResults={10}
          onNewRequest={(text, index) => { this.setState({
            emailSelecionado: text
          }) }}
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
    </div>)
  }

  getUsuarios = () => {
    axios.get('http://localhost:8080/pessoa').then(this.handleUsers).catch(function(error) {
      alert(error);
    });
  }

  handleUsers = (response) => {

    var count = Object.keys(response.data).length;

    for (var i = 0; i < count; i++) {

      var arrayvar = this.state.users;
      arrayvar.push(response.data[i].email)

      this.setState({ users: arrayvar })
    }

  }

  handleCargo = (event, index, value) => {
    this.setState({cargo: value})
  };

  handleSalvarPermissoes = () => {

    axios.put('http://localhost:8080/change-role', {
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

    axios.get('http://localhost:8080/pessoa?q=', {
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
