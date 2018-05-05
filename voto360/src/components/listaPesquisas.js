import React from 'react'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableBody,
  TableRowColumn,
  FontIcon,
} from 'material-ui'
import axios from 'axios'
import { red500, blue500 } from 'material-ui/styles/colors'
import SimpleDialog from './dialogs/SimpleDialog'

const COLUMNS = ['UF', 'Cargo', 'Políticos', 'Opções']

export default class ListaPesquisas extends React.PureComponent {
  constructor(props) {
    super(props)

    this.renderHeaderColumns = this.renderHeaderColumns.bind(this)
    this.renderContentColumns = this.renderContentColumns.bind(this)

    this.state = {
      dialogMessage: '',
      pesquisas: [{
        id: '123',
        estado: 'AM',
        cargo: 'Governador',
        politicos: ['Amazonino Mendes', 'Artur Virgílio', 'Alfredo Nascimento']
      }]
    }
  }
  searchPolls() {
    axios.get('http://localhost:8081/pesquisa').then((pesquisas) => {
      this.setState({ pesquisas })
    }).catch(() => {
      this.setState({ pesquisas: [] })
    })
  }
  handleEdit(id) {
    return () => {
      this.props.history.push(`/editPesquisa/${id}`)
    }
  }
  handleDelete(id) {
    return () => {
      axios.delete(`http://localhost:8081/pesquisa?id=${id}`).then(() => {
        this.setState({
          dialogMessage: 'Pesquisa excluída com sucesso'
        })
      }).catch(() => {
        this.setState({
          dialogMessage: 'Problemas ao excluir a pesquisa'
        })
      })
    }
  }
  renderHeaderColumns(label) {
    return (
      <TableHeaderColumn>
        {label}
      </TableHeaderColumn>
    )
  }
  renderContentColumns(itemPesquisa) {
    return (
      <TableRow>
        <TableRowColumn>
          {itemPesquisa.estado}
        </TableRowColumn>
        <TableRowColumn>
          {itemPesquisa.cargo}
        </TableRowColumn>
        <TableRowColumn>
          {itemPesquisa.politicos.join(', ')}
        </TableRowColumn>
        <TableRowColumn>
          <button onClick={this.handleEdit(itemPesquisa.id)} type="button">
            <FontIcon className="material-icons" color={blue500}>border_color</FontIcon>
          </button>
          <button onClick={this.handleDelete(itemPesquisa.id)} type="button">
            <FontIcon className="material-icons" color={red500}>close</FontIcon>
          </button>
        </TableRowColumn>
      </TableRow>
    )
  }
  render() {
    return (
      <React.Fragment>
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
