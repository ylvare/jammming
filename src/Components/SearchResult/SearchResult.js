import React, { Component } from 'react';
import './SearchResult.css';
import TrackList from '../TrackList/TrackList'

class SearchResult extends Component {
  render() {
    return (
      <div className="SearchResults">
                <h2>Results</h2>
                <TrackList trackList = {this.props.searchResults} trackAction = "+" trackFunction = {this.props.addToPlayList}/>
        </div>
    );
  }
}

export default SearchResult;
