import React from 'react'

import Content from './components/content'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MenuLinks from './components/menuLinks'

import './dist/css/app.css'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClose = () => this.setState({open: false});

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar onLeftIconButtonClick={this.handleToggle} title="VOTO360" />
          <MenuLinks />
          <Content open={this.state.open} handleToggle={this.handleToggle} handleClose={this.handleClose} className="container-body"/>
        </div>
      </MuiThemeProvider>
    );
  }
}
