import React from 'react'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableBody,
  TableRowColumn,
  FontIcon,
  RaisedButton,
} from 'material-ui'
import axios from 'axios'
import { red500, blue500 } from 'material-ui/styles/colors'
import SimpleDialog from './dialogs/SimpleDialog'

import '../dist/css/listaPesquisa.css'
import { ConfirmationDialog } from './dialogs/ConfirmationDialog';


const COLUMNS = ['Título', 'Descrição', 'Políticos', 'Opções']

export default class ListaPesquisas extends React.PureComponent {
  constructor(props) {
    super(props)

    this.searchPolls = this.searchPolls.bind(this)
    this.renderHeaderColumns = this.renderHeaderColumns.bind(this)
    this.renderContentColumns = this.renderContentColumns.bind(this)

    this.state = {
      dialogMessage: '',
      dialogConfirmationMessage: '',
      pesquisas: []
    }
  }
  componentWillMount() {
    this.searchPolls()
  }
  searchPolls() {
    axios.get('http://localhost:8081/pesquisa').then((pesquisas) => {
      console.log(pesquisas.data)
      this.setState({ pesquisas: pesquisas.data })
    }).catch(() => {
      this.setState({
        pesquisas: [],
        dialogMessage: 'Problemas ao buscar as pesquisas de voto'
      })
    })
  }
  handleEdit(id = 'new') {
    return () => {
      this.props.history.push(`/formPesquisa/${id}`)
    }
  }

  handleDelete(id) {
    return () => {
      axios.delete(`http://localhost:8081/pesquisa/${id}`).then(() => {
        this.setState({
          dialogConfirmationMessage: 'Pesquisa excluída com sucesso'
        })
        // updating current polls
        this.searchPolls()
      }).catch(() => {
        this.setState({
          dialogConfirmationMessage: 'Problemas ao excluir a pesquisa'
        })
      })
    }
  }


  renderHeaderColumns(label) {
    return (
      <TableHeaderColumn key={label}>
        {label}
      </TableHeaderColumn>
    )
  }

  getPollPoliticians = (itemPesquisa) => {
    let politico = itemPesquisa.politico
    axios.get(`http://localhost:8081/politico/${politico}`).then((res) => {
      console.log(res)
      return res
      // this.setState({ pesquisas: pesquisas.data })
    }).catch(() => {
      this.setState({
        pesquisas: [],
        dialogMessage: 'Problemas ao buscar as pesquisas de voto'
      })
    })
  }

  renderContentColumns(itemPesquisa) {
    const id = itemPesquisa._id // eslint-disable-line no-underscore-dangle
    return (
      <TableRow key={id}>
        <TableRowColumn>
          {itemPesquisa.titulo}
        </TableRowColumn>
        <TableRowColumn>
          {itemPesquisa.descricao}
        </TableRowColumn>
        <TableRowColumn>
          {itemPesquisa.politicos.map((politician) => { var politicos = this.getPollPoliticians(politician); console.log(politicos) })}
        </TableRowColumn>
        <TableRowColumn>
          <button onClick={this.handleEdit(id)} type="button">
            <FontIcon className="material-icons" color={blue500}>border_color</FontIcon>
          </button>
          <button onClick={this.handleDelete(id)} type="button">
            <FontIcon className="material-icons" color={red500}>close</FontIcon>
          </button>
        </TableRowColumn>
      </TableRow>
    )
  }
  render() {
    return (
      <React.Fragment>
        <div className="buttonContainer">
          <RaisedButton label="Nova Pesquisa" onClick={this.handleEdit()} primary className="buttonContainer--button-default" />
        </div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {COLUMNS.map(this.renderHeaderColumns)}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.pesquisas.map(this.renderContentColumns)}
          </TableBody>
        </Table>
        <SimpleDialog
          open={!!this.state.dialogMessage}
          message={this.state.dialogMessage}
          onRequestClose={() => {
            this.setState({
              dialogMessage: '',
            })
          }}
        />
      </React.Fragment>
    )
  }
}
