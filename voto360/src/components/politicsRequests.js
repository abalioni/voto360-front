import React from 'react'
import axios from 'axios'

import { gray900 } from 'material-ui/styles/colors';
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import '../dist/css/politicsrequest.css'

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

export default class PoliticsRequests extends React.Component {

  

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
    return (<div className="container-list">
      <div className="pending-list">
      <List>
        <Subheader>Pendentes</Subheader>
        <ListItem
            primaryText="Brunch this weekend?"
            secondaryText={
              <p>
                <span>Brendan Lim</span> --
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
              </p>
            }
            secondaryTextLines={2}
          />

      </List>             
    </div> 
    <div className="pending-info">
      <Card>
        <CardTitle title="Card title" subtitle="Card subtitle" />
      </Card>
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