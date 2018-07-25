import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList'

class PlayList extends Component {

  constructor(props){
    super(props)
    this.state = {
      playListName : ''
    }
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
  }

  handleInputValueChange(e){
    this.setState ({
      playListName: e.target.value
    })
    e.preventDefault()
  }
  render() {
    return (
      <div className="Playlist">
            <input onChange={this.handleInputValueChange} defaultValue='New Playlist' />
            <TrackList trackList = {this.props.playList} trackAction = "-" trackFunction = {this.props.removeFromPlayList}/>
            <a className="Playlist-save">SAVE TO SPOTIFY</a>
        </div>
    );
  }
}

export default PlayList;
