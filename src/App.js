import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResult from './Components/SearchResult/SearchResult'
import PlayList from './Components/PlayList/PlayList'


const track1 = {
  key            : "1",
  title          : "Tiny Dancer",
  artist         : "Elton John",
  album          : "Madman Across The Water",
}

const track2 = {
  key            : "2",
  title          : "Stronger",
  artist         : "Britney Spears",
  album          : "Oops!... I Did It Again"
}

const track3 = {
  key            : "3",
  title          : "So Emotional",
  artist         : "Whitney Houston",
  album          : "Whitney"
}

const track4 = {
  key            :"4",
  title          : "Titel 4",
  artist         : "Artist 4",
  album          : "Artist 4"
}

const searchResult = [track1, track2, track4]
const playList = [track3]

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchResult:searchResult,
      playList:playList
    }
    this.addToPlayList = this.addToPlayList.bind(this)
    this.removeFromPlayList = this.removeFromPlayList.bind(this)
  }

  addToPlayList(track){
    const newSearchResult = this.state.searchResult.filter(e => e !== track)
    this.state.playList.push(track)
    this.setState({
      searchResult:newSearchResult
    })
  }

  removeFromPlayList(track){
    const newPlayList = this.state.playList.filter(e => e !== track)
    this.state.searchResult.push(track)
    this.setState({
      playList: newPlayList
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
             <SearchResult searchResults = {this.state.searchResult} addToPlayList = {this.addToPlayList}/>
             <PlayList playList={this.state.playList} removeFromPlayList = {this.removeFromPlayList}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
