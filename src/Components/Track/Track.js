import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

  constructor(props){
    super(props)
    this.handleTrackFunction = this.handleTrackFunction.bind(this)
  }

handleTrackFunction(e){
  this.props.trackFunction(this.props.track)
  e.preventDefault()
}

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.title}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleTrackFunction} >{this.props.trackAction}</a>
      </div>
    );
  }
}

export default Track;
