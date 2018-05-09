import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios'
import '../dist/css/home.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      politicianList: [],
      selectedPolitician: "",
      politiciansNames: [],
      selectedPolitician: {}

    }

  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://legis.senado.leg.br/dadosabertos/senador/lista/atual',
      "headers": {
        "accept": "application/json"
      }
    })
      .then((res) => {
        this.setState({
          politicianList: res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar
        })
        var names = []
        res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.forEach((politicianInfo, index) => {
          names.push(politicianInfo.IdentificacaoParlamentar.NomeParlamentar)
        })
        this.setState({ politiciansNames: names })
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  }

  render() {
    return (<div>
      <div className="main-section">
        <AppName />
        <div className="search-bar-container">
          <AutoComplete
            floatingLabelText="Pesquise o Politico"
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.state.politiciansNames}
            maxSearchResults={5}
            onNewRequest={(text, index) => {
              console.log("text", text)
              this.setState(prevState => ({
                selectedPolitician: {
                  ...prevState.selectedPolitician,
                  NomeParlamentar: text
                }
              }))
              this.displayPolitician()
            }}
          />
          <RaisedButton label="Pesquisar" secondary={true} onClick={this.displayPolitician}/>
        </div>
      </div>
      <MiddleBar />
      <BottomSection />
    </div>)
  }

  displayPolitician = () => {
    this.state.politicianList.forEach((politician, index) => {
      if (politician.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedPolitician.NomeParlamentar) {
        this.setState(prevState => ({
          selectedPolitician:
            politician.IdentificacaoParlamentar
        }))
        console.log(this.state.selectedPolitician.CodigoParlamentar)
        this.props.history.push(`/perfilPolitico/`+ this.state.selectedPolitician.CodigoParlamentar )
        return
      }
    })
  }
}

const AppName = () => (
  <div className="app-name">
    <span className="black-title">VOTO
      <span className="green-title">3
        <span className="yellow-title">6
          <span className="blue-title">0</span>
        </span>
      </span>
    </span>
  </div>
)

const MiddleBar = () => (
  <div className="middleBar">

  </div>
)

const BottomSection = () => (
  <div>

  </div>
)
