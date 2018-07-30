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
      profileId: '',
      searchValue: ''

    }

    this.addToPlayList = this.addToPlayList.bind(this)
    this.removeFromPlayList = this.removeFromPlayList.bind(this)
    this.getTracks = this.getTracks.bind(this)
    this.savePlayListToSpotify = this.savePlayListToSpotify.bind(this)
    this.changePlayListTitle = this.changePlayListTitle.bind(this)
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this)
  }

  componentDidMount = async () => {
  const url = window.location.href;
  if (url.indexOf("token=") > -1) {
    let authToken = url.match(/access_token=([^&]*)/)[1]
    const expiresIn = url.match(/expires_in=([^&]*)/)[1]
    const authorized = true;

    window.setTimeout(() => {
      authToken = ''
      this.setState({
        authToken : authToken,
        authorized : false,
        profileId: []}
        );
    }, expiresIn * 1000);

    window.history.pushState('Access Token', null, '/');

    this.setState({
      authToken : authToken,
      authorized : authorized});

    const searchValue  = sessionStorage.getItem("searchValue")
    this.setState({
        searchValue: searchValue
      })

    window.setTimeout(async () => {
       this.getTracks()
    }, 1)
  }
}

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

  async handleAuthFlow() {
    const profileId = await Spotify.handleAuthFlow(this.state.authorized, this.state.authToken)
    this.setState({
      profileId: profileId
    })
  }

  handleSearchValueChange(searchValue){
    this.setState ({
      searchValue: searchValue
    })
  }

  async getTracks(){
      window.sessionStorage.setItem('searchValue', this.state.searchValue);
      this.handleAuthFlow()
      if(this.state.authorized) {
      const searchResult = await Spotify.getTracks(this.state.searchValue, this.state.authToken)
      this.setState({
          searchResult: searchResult
        })
     }
  }

  savePlayListToSpotify(){
    const trackSpotifyUris = this.state.playList.map(track => track.uri)
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
            <SearchBar searchValue = {this.state.searchValue} handleSearchValueChange = {this.handleSearchValueChange} getTracks = {this.getTracks}/>
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
