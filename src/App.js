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
      playList:[],
      playListTitle: 'New Playlist',
      authToken: "",
      authorized: false,
      profileId: []
    }

    this.addToPlayList = this.addToPlayList.bind(this)
    this.removeFromPlayList = this.removeFromPlayList.bind(this)
    this.getTracks = this.getTracks.bind(this)
    this.savePlayListToSpotify = this.savePlayListToSpotify.bind(this)
    this.changePlayListTitle = this.changePlayListTitle.bind(this)
  }

  componentDidMount = () => {
  const url = window.location.href;
  if (url.indexOf("token=") > -1) {
    const authToken = url
      .split("token=")[1]
      .split("&")[0]
      .trim();
    const authorized = true;
    this.setState({
      authToken : authToken,
      authorized : authorized });
  }
};

  changePlayListTitle(title){
    this.setState({
      playListTitle:title
    })
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

  _uniqBy (array, key) {
   let result = new Set()
   array.forEach(function(item) {
       if (item.hasOwnProperty(key)) {
           result.add(item);
       }
    })
    return Array.from(result)
  }


  async getTracks(searchValue){
      const profileId = await Spotify.handleAuthFlow(this.state.authorized, this.state.authToken)
      this.setState({
        profileId: await profileId
      })
      if (this.state.authorized) {
        const searchResult = await Spotify.getTracks(searchValue, this.state.authToken)
        this.setState({
          searchResult: this._uniqBy(searchResult,'key')
        })
      }
  }

  savePlayListToSpotify(){
    const trackSpotifyUris = this.state.playList.map(track => track.uri);
    if(Spotify.savePlayListToSpotify(this.state.playListTitle,trackSpotifyUris,this.state.profileId, this.state.authToken)){
      this.setState({
        playList:[],
        playListTitle:'New Playlist '
      })
    }
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar getTracks = {this.getTracks}/>
            <div className="App-playlist">
             <SearchResult searchResults = {this.state.searchResult} addToPlayList = {this.addToPlayList}/>
             <PlayList playList={this.state.playList} playListTitle = {this.state.playListTitle} changePlayListTitle = {this.changePlayListTitle} removeFromPlayList = {this.removeFromPlayList} savePlayListToSpotify={this.savePlayListToSpotify}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
