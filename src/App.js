import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResult from './Components/SearchResult/SearchResult'
import PlayList from './Components/PlayList/PlayList'


class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResult />
              <PlayList />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
