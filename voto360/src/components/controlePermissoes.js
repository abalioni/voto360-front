import React from 'react'
import SelectCargo from './SelectCargo'
import axios from 'axios'

import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


const style = {
  margin: 12,
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
    return (<div>
      <h3>Controle Permissoes</h3>
        <AutoComplete
          floatingLabelText="Pesquise o usuário por email"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.users}
          maxSearchResults={10}
          onNewRequest={(text, index) => { this.setState({
            emailSelecionado: text
          }) }}
        />
        <RaisedButton label="Buscar usuários" primary={true} style={style} onClick={this.getUsuarios}/>

        <div>
          <SelectField
            floatingLabelText="Permissões"
            value={this.state.cargo}
            onChange={this.handleCargo}
          >
            <MenuItem value={"eleitor"} primaryText="Eleitor" />
            <MenuItem value={"politico"} primaryText="Político" />
            <MenuItem value={"admin"} primaryText="Admin" />
          </SelectField>
        </div>


      <RaisedButton label="Salvar" primary={true} style={style} onClick={this.handleSalvarPermissoes}/>
    </div>)
  }

  getUsuarios = () => {
    axios.get('http://localhost:8081/pessoa').then(this.handleUsers).catch(function(error) {
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
