import React from 'react'

import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import PesquisaPoliticoItem from './pesquisaPoliticoItem'

import { cookie } from 'cookie_js'
import { Redirect } from 'react-router-dom'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';

import '../dist/css/pesquisa.css'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

export default class Pesquisa extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pesquisas: []
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:8081/api/pesquisa',
      "headers": {
        "accept": "application/json"
      }
    }).then((res) => {
      let pesquisas = [];

      if (res.data) {
        res.data.forEach(pesquisa => {
          pesquisas.push(
            {
              "titulo": pesquisa.titulo,
              "descricao": pesquisa.descricao,
              "opcoes": pesquisa.politicos
            }
          );
        });
      }

      this.setState({ pesquisas: pesquisas });
    }).catch((error) => {
      console.log(error);
      return error;
    });
  }

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOpt: changeEvent.target.value
    })
  }

  onChange = (event, id) => {
    this.setState({ selected: id });
  }

  render() {
    const user = cookie.get('user');
    const pesquisas = this.state.pesquisas;
    const teste = ["0", "1", "2", "3"];

    console.log('pesquisas:', pesquisas);
    if (true) {
      return (
        <div className="card-container">
          {
            pesquisas.map((pesquisa) => {
              return (
              <Card className="card">
                <CardTitle title={pesquisa.titulo} subtitle={pesquisa.descricao} className="card-title" />
                <RadioButtonGroup name="shipSpeed" labelPosition="left" className="radio-buttongroup">
                {
                  pesquisa.opcoes.map((opcao) => {
                    return (<RadioButton
                      value={opcao.politico._id}
                      label={opcao.politico.nome_eleitoral}
                      style={styles.radioButton}
                      className="radio-button"
                    />)
                  })
                }
                </RadioButtonGroup>
                <CardActions>
                  <FlatButton label="Votar" secondary={true} fullWidth={true} />
                </CardActions>
              </Card>);
            })
          }
        </div>
      );
    }
  };
};
