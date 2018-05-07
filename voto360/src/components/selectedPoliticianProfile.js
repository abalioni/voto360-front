import React from 'react'

import {
  TextField, 
  Divider,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RefreshIndicator } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {gray900} from 'material-ui/styles/colors';
import SimpleDialog from './dialogs/SimpleDialog'
import MateriasCards from './materiasCards'

import '../dist/css/selectedPoliticianProfile.css'

import axios from 'axios'

const styles = {
  floatingLabelStyle: {
    color: gray900
  },
  underlineStyle: {
    borderColor: gray900
  }
};

export default class SelectedPoliticianProfile extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      id: props.match.params.id,
      senha: '',
      done: false,
      success: false,
      open: false,
      response: {}
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    var candidato = this.state.id;
    axios({
        method: 'get',
        url: `http://legis.senado.leg.br/dadosabertos/senador/${candidato}`,
        "headers": {
            "accept": "application/json"
        }
    })
        .then((res) => {
            this.setState({
                response: res.data.DetalheParlamentar.Parlamentar,
                done: true
            })
            console.log(this.state.response)
            return res;
        })
        .catch((error) => {
            this.setState({
                done: false
            })
            console.log(error);
            return error;
        }) 
    }

  render() {
    return (this.state.done ? 
    (<div className="container">
    <aside className="sidebar">
        <div className="profile-pic-container">
          <img className="profile-pic"src={this.state.response.IdentificacaoParlamentar.UrlFotoParlamentar} />
        </div>
          <Divider />
        <div className="politician-info">
            <h3 className="header-center">{this.state.response.IdentificacaoParlamentar.NomeParlamentar}</h3>
            <Divider />
            <h4 className="header-center">{this.state.response.IdentificacaoParlamentar.FormaTratamento}</h4>
            <Divider />
            <h4 className="header-center">{this.state.response.FiliacaoAtual.Partido.SiglaPartido}</h4>
            <Divider />
        
        </div>
    </aside>
    <section className="info-section">
        <div className="info-container">
            <h3 >Sobre</h3>
            <Divider />
            <p >Nome Completo: {this.state.response.IdentificacaoParlamentar.NomeCompletoParlamentar}</p>
            {this.state.response.IdentificacaoParlamentar ? (<span>Sexo: {this.state.response.IdentificacaoParlamentar.SexoParlamentar}</span>) : null}
            <p>{this.state.response.IdentificacaoParlamentar ? (<span>Cargo: {this.state.response.IdentificacaoParlamentar.FormaTratamento}</span>) : undefined}</p>
            <div className="list">
              {this.state.response.MateriasDeAutoriaTramitando.Materia.map((item, i) => {
                return (<MateriasCards item={item}/>)
              })}
              
            </div>  
        </div>
          <div className="left-container">

          </div>
        </section>
      </div>) : <RefreshIndicator
        size={40}
        left={410}
        top={420}
        status="loading"
      />)
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
