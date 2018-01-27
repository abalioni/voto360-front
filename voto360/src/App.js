import React from 'react'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Content } from './components/content'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

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
    return (<div>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <AppBar onLeftIconButtonClick={this.handleToggle} title="VOTO360"/>
        <Content/>
        <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </MuiThemeProvider>
    </div>);
  }
}
