import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends Component {

  render() {
    return (
      <div className="TrackList">
        {this.props.trackList.map(track=>{
          return <Track key = {track.key} track={track} trackAction={this.props.trackAction} trackFunction = {this.props.trackFunction}/>
        })}
      </div>
    );
  }
}

export default TrackList;
