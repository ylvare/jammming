import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResult from './Components/SearchResult/SearchResult'
import PlayList from './Components/PlayList/PlayList'
import {Spotify} from './Util/Spotify'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchResult:[],
      playList:[]
    }

    this.addToPlayList = this.addToPlayList.bind(this)
    this.removeFromPlayList = this.removeFromPlayList.bind(this)
    this.getTracks = this.getTracks.bind(this)
  }

  addToPlayList(track){
    const newSearchResult = this.state.searchResult.filter(e => e !== track)
    this.state.playList.push(track)
    console.log(track.id)
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

  uniqBy (array, key) {
   let result = new Set()
   array.forEach(function(item) {
       if (item.hasOwnProperty(key)) {
           result.add(item);
       }
    })
    return Array.from(result)
  }


  async getTracks(searchValue){
      const searchResult = await Spotify.getTracks(searchValue)
      this.setState({
        searchResult: this.uniqBy(searchResult,'key')
      })
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar getTracks = {this.getTracks}/>
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
