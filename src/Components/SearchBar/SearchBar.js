import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <div class="SearchBar">
        <input placeholder="Enter A Song Title" />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
