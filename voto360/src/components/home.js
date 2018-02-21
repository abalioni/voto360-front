import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import style from '../dist/css/home.css'

export default class Home extends React.Component {
  render() {
    return <FullHome />
  }
}

const FullHome = () => (
  <div>
    <SearchBar/>
    <MiddleBar/>
  </div>
)

const AppName = () => (
  <div className="app-name">
    <span className="black-title">VOTO
      <span className="green-title">3
        <span className="yellow-title">6
          <span className="blue-title">0</span>
        </span>
      </span>
    </span>
  </div>
)

const SearchBar = () => (
  <div className="main-section">
    <AppName/>
    <div className="search-bar-container">
      <input type="text" className="searchBar" placeholder="Pesquisar politico"/>
      <RaisedButton label="Pesquisar" secondary={true}/>
    </div>
  </div>
)

const MiddleBar = () => (
  <div className="middleBar">

  </div>
)

const BottomSection = () => (
  <div>
    
  </div>
)
