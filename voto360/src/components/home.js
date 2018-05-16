import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
import '../dist/css/home.css'


export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      politicianList: [],
      selectedPolitician: "",
      politiciansNames: [],
      selectedPolitician: {},
      value: '',
      suggestions: []

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
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  }

  getSuggestionValue = (suggestion) => suggestion.IdentificacaoParlamentar.NomeParlamentar;

  renderSuggestion = (suggestion) => {
    return (<div>
      {suggestion.IdentificacaoParlamentar.NomeParlamentar}
    </div>)
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.state.politicianList.filter(politician =>
      politician.IdentificacaoParlamentar.NomeParlamentar.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };



  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Escolha o Político',
      value,
      onChange: this.onChange
    };

    return (<div>
      <div className="main-section">
        <AppName />
        <div className="search-bar-container">
          <div className="search-n-button">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={(event, suggestionValue) => {
                this.displayPolitician(suggestionValue)
              }}
            />
            <button type="button" onClick={this.goToPoliticianProfile} className="search-button">Pesquisar</button>
            {/* <RaisedButton label="Pesquisar" onClick={this.displayPolitician} backgroundColor='rgb(26, 35, 126)' labelColor='white' className="button" /> */}
          </div>
        </div>
      </div>
      <MiddleBar />
      <BottomSection />
    </div>)
  }

  displayPolitician = (suggestion) => {
    console.log(suggestion)
    this.state.politicianList.forEach((politician, index) => {
      if (politician.IdentificacaoParlamentar.NomeParlamentar === suggestion.suggestionValue) {
        this.setState({
          selectedPolitician: politician.IdentificacaoParlamentar
        });
        return
      }
    })
  }

  goToPoliticianProfile = () => {
    console.log("GO DEMONIO GO")
    this.props.history.push(`/perfilPolitico/` + this.state.selectedPolitician.CodigoParlamentar)
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
