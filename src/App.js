import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResult from './Components/SearchResult/SearchResult'
import PlayList from './Components/PlayList/PlayList'


const track1 = {
  title          : "Tiny Dancer",
  artist         : "Elton John",
  album          : "Madman Across The Water",
}

const track2 = {
  title          : "Stronger",
  artist         : "Britney Spears",
  album          : "Oops!... I Did It Again"
}

const track3 = {
  title          : "So Emotional",
  artist         : "Whitney Houston",
  album          : "Whitney"
}

const searchResult = [track1, track2]
const playList = [track3]

class App extends Component {

  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
             <SearchResult searchResults = {searchResult}/>
             <PlayList playList={playList}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
