import React from 'react'

import {Redirect} from 'react-router-dom'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import styles from '../dist/css/pesquisa.css'
import { cookie } from 'cookie_js'

export default class Pesquisa extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cargo: '',
      concorrentes: {
        concorrente_um: 'a',
        concorrente_dois: 'b',
        concorrente_tres: 'c'
      }
    }
  }

  render() {
    const user = cookie.get('user');
    if(user){
        return <Card />
    }
    return <Redirect to={{
        pathname: '/login',
        state: {
          referrer: window.location.href.replace(window.location.origin, '')
        }
      }}
    />;

  }
}

const Card = (props) => (
  <div className="Card">
    <h2>Cargo</h2>
      <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" className="radioButtonGroup">
        <RadioButton value="light" label="Candidato 1" style={styles.radioButton}/>
        <RadioButton value="not_light" label="Candidato 2" style={styles.radioButton}/>
      </RadioButtonGroup>
  </div>
)
