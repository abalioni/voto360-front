import React from 'react'

import {Redirect} from 'react-router-dom'

import styles from '../dist/css/pesquisa.css'
import { cookie } from 'cookie_js'

export default class Pesquisa extends React.Component {

  render() {
    const user = cookie.get('user');
    if(user){
        return <Card />
    }
    return <Redirect to={'/login'} />;

  }
}

const Card = (props) => (
  <div className="Card">
    <h2>Cargo</h2>
  </div>
)
