import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { gray900 } from 'material-ui/styles/colors';
import {Card, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PoliticianListItem from './politicianListItem'

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
      politicians_response: [],
      selected_politician: []
    }
    this.handleUsers = this.handleUsers.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8081/politico?q={"perfil_aprovado":"false"}')
      .then((res) => {
        this.setState({ politicians_response: res.data })
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  }

  handleOptionChange = (i) => {
    console.log("click politics request")
    console.log("id", i)
    axios.get(`http://localhost:8081/politico?q={"_id":"${i}"}`)
      .then((res) => {
        console.log(res)
        this.setState({selected_politician: res.data[0]})
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })

  }  

  render() {
    return (<div className="container-list">
      <div className="pending-list">
      <List>
          <Subheader>Pendentes</Subheader>
          {this.state.politicians_response.map((item, i) => {
          return (<PoliticianListItem
            handleOptionChange={this.handleOptionChange}
            key={i}
            value={item}
          />
          )
        })}
        </List>
    </div> 
      <div className="pending-info">
        {this.state.selected_politician && this.state.selected_politician.nome_eleitoral ? 
          (<Card>
          <CardTitle title={this.state.selected_politician && this.state.selected_politician.nome_eleitoral} subtitle={this.state.selected_politician && this.state.selected_politician.emaileleitoral} />
          <CardText>
            {/* "1999-04-16T21:49:10.378Z"
            emaileleitoral:"jose.banana@gov.br"
            escolaridade:"Superior - Completo"
            estado:"SP"
            nome_eleitoral:"José Da Banana"
            partido:"DEM"
            perfil_aprovado:false
            __v:0
            _id:"5ad51a5e634001e0909138d1" */}
            {this.state.selected_politician && this.state.selected_politician.escolaridade ? (<p>Escolaridade: {this.state.selected_politician.escolaridade}</p>) : undefined}
            {this.state.selected_politician && this.state.selected_politician.estado ? (<p>Estado: {this.state.selected_politician.estado}</p>) : undefined}
            {this.state.selected_politician && this.state.selected_politician.partido ? (<p>Partido: {this.state.selected_politician.partido}</p>) : undefined}
          </CardText>
        </Card>) 
        : undefined}
      
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
