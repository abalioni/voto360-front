import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { gray900 } from 'material-ui/styles/colors';
import '../../dist/css/NotLoggedReset.css'

import axios from 'axios'

import { cookie } from 'cookie_js'

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */

const styles = {
    floatingLabelStyle: {
      color: gray900,
    },
    underlineStyle: {
      borderColor: gray900,
    }
};

export class RequestPoliticsProfileDialog extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          isLoggedIn: cookie.get('user'),
          users: [],
          email: '',
          novaSenha: '',
          token: '',
          success: false,
          open: false,
          success_dialog: false
        }   
      }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            open: nextProps.open
        })
    }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false, success_dialog: true});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Continuar"
        primary={true}
        onClick={this.callPoliticsSignUp}
      />,
    ];
    return (
      <div>
            <Dialog
                title="Abrir solicitação para perfil político"
                modal={false}
                open={this.state.open}
                actions={actions}
                onRequestClose={this.handleClose}
                message="Tem certeza? Apenas um políticos podem solicitar esse tipo de perfil. Ao continuar você irá fornecer as informações necessárias para obter um perfil de político."
            >
            {this.props.message}
        
        </Dialog>
      </div>
    );
  }
}

export default withRouter(RequestPoliticsProfileDialog)