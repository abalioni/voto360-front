import React from 'react'
import {
  AutoComplete,
  RaisedButton,
  FontIcon,
  List,
  TextField,
  ListItem,
} from 'material-ui'
import axios from 'axios'
import { red500 } from 'material-ui/styles/colors'
import SimpleDialog from './dialogs/SimpleDialog'

import Estados from './dropdown/estados'


export default class FormPesquisa extends React.PureComponent {
  constructor(props) {
    super(props)

    this.findPoliticians = this.findPoliticians.bind(this)
    this.handleEstadoChange = this.handleEstadoChange.bind(this)
    this.handleSelectPolitician = this.handleSelectPolitician.bind(this)
    this.handleAddPolitician = this.handleAddPolitician.bind(this)
    this.handleAddPoll = this.handleAddPoll.bind(this)
    this.handleCancelPoll = this.handleCancelPoll.bind(this)
    this.handleDeleteSelected = this.handleDeleteSelected.bind(this)
    this.genericUpdateState = this.genericUpdateState.bind(this)

    this.state = {
      descricao: '',
      titulo: '',
      politicians: [],
      currentPolitician: '',
      selectedPoliticians: [],
      dialogMessage: ''
    }
  }
  componentWillMount() {
    const editId = this.props.match.params.id
    if (editId !== 'new') {
      axios.get(`http://localhost:8081/api/pesquisa/${editId}`)
        .then((pesquisa) => {
          this.setState({
            titulo: pesquisa.data.titulo,
            descricao: pesquisa.data.descricao,
            selectedPoliticians: pesquisa.data.politicos.map((politician) => politician.politico)
          })
        })
        .catch(() => {
          this.setState({
            dialogMessage: 'Problemas ao carregar pesquisa'
          })
        })
    }
  }
  findPoliticians(state) {
    // TODO: Get approved only
    axios.get(`http://localhost:8081/politico?q={"estado": "${state}"}`).then((politicians) => {
      this.setState({
        politicians: politicians.data
      })
    }).catch(() => {
      this.setState({
        dialogMessage: 'Problemas ao recuperar a lista de políticos'
      })
    })
  }
  handleEstadoChange(event, state) {
    this.findPoliticians(state)
  }
  handleAddPolitician() {
    const found = this.state.politicians.filter((politician) => {
      return politician.nome_eleitoral === this.state.currentPolitician && this.state.selectedPoliticians.indexOf(politician) === -1
    })
    if (!found.length) {
      return
    }
    const currentState = Object.assign({}, this.state)
    currentState.selectedPoliticians.push(found[0])
    this.setState({
      selectedPoliticians: currentState.selectedPoliticians,
    })
    this.forceUpdate()
  }
  handleSelectPolitician(currentPolitician) {
    this.setState({ currentPolitician })
  }
  handleAddPoll() {
    const method = this.props.match.params.id !== 'new' ? 'put' : 'post'
    axios({
      method,
      url: `http://localhost:8081/api/pesquisa${this.props.match.params.id !== 'new' ? `/${this.props.match.params.id}` : ''}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {
        titulo: this.state.titulo,
        descricao: this.state.descricao,
        politicos: this.state.selectedPoliticians.map((politician) => { return { politico: politician } })
      }
    }).then(() => {
      this.setState({
        selectedPoliticians: [],
        dialogMessage: 'Pesquisa salva com sucesso'
      })
    }).catch(() => {
      this.setState({
        dialogMessage: 'Problemas para salvar a pesquisa'
      })
    })
  }
  handleCancelPoll() {
    this.props.history.goBack()
  }
  handleDeleteSelected(index) {
    return () => {
      const selectedPoliticians = this.state.selectedPoliticians.slice(0)
      selectedPoliticians.splice(index, 1)
      this.setState({
        selectedPoliticians
      })
    }
  }
  genericUpdateState(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <div>
          <TextField
            name="titulo"
            value={this.state.titulo}
            onChange={this.genericUpdateState}
            hintText="Título"
          />
        </div>
        <div>
          <TextField
            name="descricao"
            value={this.state.descricao}
            onChange={this.genericUpdateState}
            hintText="Descrição"
          />
        </div>
        {this.state.selectedPoliticians.length ? (
          <div>
              Candidatos selecionados para a pesquisa:
            <List>
              {this.state.selectedPoliticians.map((politician, index) => (
                <ListItem
                  key={politician._id} // eslint-disable-line no-underscore-dangle
                  primaryText={politician.nome_eleitoral}
                  rightIcon={(
                    <button onClick={this.handleDeleteSelected(index)} type="button">
                      <FontIcon className="material-icons" color={red500}>close</FontIcon>
                    </button>
                  )}
                />
              ))}
            </List>
          </div>
        ) : null}
        <div>
          <Estados handleEstadoChange={this.handleEstadoChange} />
          <AutoComplete
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.state.politicians.map((politician) => politician.nome_eleitoral)}
            maxSearchResults={5}
            floatingLabelText="Pesquise o político por nome"
            // floatingLabelStyle={styles.floatingLabelStyle}
            // underlineStyle={styles.underlineStyle}
            onNewRequest={this.handleSelectPolitician}
          />
          <RaisedButton primary label="Adicionar opção" onClick={this.handleAddPolitician} />
          <SimpleDialog
            open={!!this.state.dialogMessage}
            message={this.state.dialogMessage}
            onRequestClose={() => {
              this.setState({
                dialogMessage: '',
              })
            }}
          />
        </div>
        <div className="buttonContainer">
          <RaisedButton secondary label="Cancelar" onClick={this.handleCancelPoll} className="buttonContainer--button-default" />
          <RaisedButton primary label="Salvar" onClick={this.handleAddPoll} className="buttonContainer--button-default" />
        </div>
      </div>
    )
  }
}
