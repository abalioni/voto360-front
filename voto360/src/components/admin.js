import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { MeusDados } from './meusdados'
import ControlePermissoes from './controlePermissoes'

export const Admin = ({ match }) => (
  <div>
    <h2>Admin</h2>
    <ul>
      <li>
        <Link to={`${match.url}/meusDados`}>
          Meus dados
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/controlePermissoes`}>
          Controle de permissoes
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/meusDados`} component={MeusDados}/>
    <Route path={`${match.url}/controlePermissoes`} component={ControlePermissoes}/>

  </div>
)
