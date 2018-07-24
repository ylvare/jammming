import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchValue : ''
    }
    this.handleGetTracks = this.handleGetTracks.bind(this)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
  }

  handleInputValueChange(e){
    this.setState ({
      searchValue: e.target.value
    })
    e.preventDefault()
  }

  handleGetTracks(e){
    this.props.getTracks(this.state.searchValue)
    e.preventDefault()
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleInputValueChange} placeholder="Enter A Song Title" />
        <a  onClick={this.handleGetTracks}> SEARCH </a>
      </div>
    );
  }
}

export default SearchBar;
