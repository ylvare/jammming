import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

class PlayList extends Component {

  constructor(props){
    super(props)

    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.handleSavePlayList = this.handleSavePlayList.bind(this)
  }

  handleInputValueChange(e){
    this.props.changePlayListTitle(e.target.value)
    e.preventDefault()
   }

  handleSavePlayList(e){
      this.props.savePlayListToSpotify()
      e.preventDefault()
    }

  render() {
    return (
      <div className="Playlist">
            <input onChange={this.handleInputValueChange} value={this.props.playListTitle} />
            <TrackList trackList = {this.props.playList} trackAction = "-" trackFunction = {this.props.removeFromPlayList}/>
            <a onClick={this.handleSavePlayList} className="Playlist-save">SAVE TO SPOTIFY</a>
        </div>
    );
  }
}

export default PlayList;
