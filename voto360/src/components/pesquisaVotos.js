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
      pesquisas: [],
      done: false
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
      console.log(res)
      let pesquisas = [];

      if (res.data) {
        res.data.forEach(pesquisa => {
          pesquisas.push(
            {
              "id": pesquisa._id,
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

    return (
      <div className="card-container">
        {
          pesquisas.map((pesquisa, i) => {
            let politico_id = '';
            return (
              <Card className="card">
                <CardTitle title={pesquisa.titulo} subtitle={pesquisa.descricao} className="card-title" />
                <RadioButtonGroup name="shipSpeed" labelPosition="left" className="radio-buttongroup" key={i + "pesquisa"} onChange={(event, value) => {
                  politico_id = value
                }}>
                  {
                    pesquisa.opcoes.map((opcao, i) => {
                      return (<RadioButton
                        value={opcao.politico._id}
                        label={opcao.politico.nome_eleitoral}
                        style={styles.radioButton}
                        key={i + "politico"}
                        className="radio-button"
                      />)
                    })
                  }
                </RadioButtonGroup>
                <CardActions>
                  <FlatButton label="Votar" secondary={true} fullWidth={true} onClick={() => { this.makeVote(pesquisa.id, politico_id) }} />
                </CardActions>
              </Card>);
          })
        }
      </div>
    );

  };

  makeVote = (pesquisa_id, politico_id) => {
    axios.post(`http://localhost:8081/api/pesquisa/${pesquisa_id}/votar/${politico_id}`)
      .then((response) => {
        this.getResults(pesquisa_id)
        this.setState({
          done: true
        })
      })
      .catch(function (error) {
        alert(error);
      });
  }

  getResults = (pesquisa_id) => {
    console.log("get results")
    axios.get(`http://localhost:8081/api/pesquisa/${pesquisa_id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        alert(error);
      });
  }

};
