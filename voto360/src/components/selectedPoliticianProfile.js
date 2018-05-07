import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {gray900} from 'material-ui/styles/colors';
import SimpleDialog from './dialogs/SimpleDialog'

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
        <div className="profile-pic-container"><img className="profile-pic"src={this.state.response.IdentificacaoParlamentar.UrlFotoParlamentar} width="100"/></div>
        <div className="politician-info">
        <h3>{this.state.response.IdentificacaoParlamentar.NomeParlamentar}</h3>
        <h4>{this.state.response.IdentificacaoParlamentar.FormaTratamento}</h4>
        <h4>{this.state.response.FiliacaoAtual.Partido.SiglaPartido}</h4>
        
        </div>
    </aside>
    <section>
        accept
    </section>
    </div>) : (<div>
    </div>))
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
