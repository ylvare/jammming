import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends Component {

  render() {
    return (
      <div className="TrackList">
        {this.props.trackList.map(track=>{
          return <Track track={track} trackAction={this.props.trackAction}/>
        })}
      </div>
    );
  }
}

export default TrackList;
