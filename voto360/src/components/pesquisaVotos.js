import React from 'react'

import Avatar from 'material-ui/Avatar';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Redirect } from 'react-router-dom'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import '../dist/css/pesquisa.css'
import { cookie } from 'cookie_js'

import PesquisaPoliticoCard from './pesquisaPoliticoItem'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

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

  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOpt: changeEvent.target.value
    })
  }

  onChange = (event, id) => {
    this.setState({ selected: id });
  }

  render() {
    const user = cookie.get('user');
    const values = [178957, 178864, 178914];
    if (user) {
      return (
        <div className="card-container">
          <Card className="card">
            <CardTitle title="Vereador" subtitle="Pesquisa de votos" className="card-title" />
            <CardText className="card-text">
              <div className="politic-container">
                <Avatar src="http://via.placeholder.com/50x50" className="avatar" />
                <Avatar src="http://via.placeholder.com/50x50" className="avatar" />
                <Avatar src="http://via.placeholder.com/50x50" className="avatar" />
              </div>
              <form>
                {values.map((item, i) => {
                  return (<PesquisaPoliticoCard
                    checked={this.state.selectedOption === item}
                    onChange={this.handleOptionChange}
                    id={item} />)
                })}
              </form>
            </CardText>
            <CardActions>
              <FlatButton label="Votar" secondary={true} fullWidth={true} />
            </CardActions>
          </Card>


          <Divider />


          <Card className="card">
            <CardTitle title="Prefeito" subtitle="Pesquisa de votos" className="card-title" />
            <CardText className="card-text">
              <div className="politic-container">
                <Avatar src="http://via.placeholder.com/50x50" className="avatar" />
                <Avatar src="http://via.placeholder.com/50x50" className="avatar" />
                <Avatar src="http://via.placeholder.com/50x50" className="avatar" />
              </div>
              <RadioButtonGroup name="shipSpeed" labelPosition="left" className="radio-buttongroup">
                <RadioButton
                  value="Fulano"
                  label="Fulano"
                  style={styles.radioButton}
                  className="radio-button"
                />
                <RadioButton
                  value="Alexia"
                  label="Alexia"
                  style={styles.radioButton}
                  className="radio-button"
                />
                <RadioButton
                  value="João"
                  label="João"
                  style={styles.radioButton}
                  className="radio-button"
                />
              </RadioButtonGroup>

            </CardText>
            <CardActions>
              <FlatButton label="Votar" secondary={true} fullWidth={true} />
            </CardActions>
          </Card>

        </div>)
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

