import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../../dist/css/politicianInfoDropdown.css'
import axios from 'axios'

const items = [];
const styles = {
  customWidth: {
    width: 300,
  },
};

export default class PoliticianInfoDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        expandedDiv: false
    };

    this.toggleExpandedClick = this.toggleExpandedClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log("props", nextProps)
  }

  componentDidMount() {
      console.log("mount")
        
  }

  toggleExpandedClick = () => {
    this.setState({ expandedDiv: !this.state.expandedDiv });
  } 



  render() {
      
    return (
        <div className="container-drop" > 
            <button type="button" onClick={this.toggleExpandedClick} className="button">{this.props.title}</button>
            <div className={`${this.state.expandedDiv ? 'children-open' : 'children-closed' }`}>
                {this.props.children}
            </div>    
        </div>
    );
  }
}