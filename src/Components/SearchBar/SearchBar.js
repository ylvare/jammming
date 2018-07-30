import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchValue : this.props.searchValue
    }
    this.handleGetTracks = this.handleGetTracks.bind(this)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
  }

  componentDidMount = async () => {
    this.setState ({
      searchValue: this.props.searchValue
    })
 }

  handleInputValueChange(e){
    this.props.handleSearchValueChange(e.target.value)
  }

  handleGetTracks(e){
    this.props.getTracks()
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleInputValueChange} defaultValue = {this.props.searchValue} placeholder="Enter A Song Title" />
        <a  onClick={this.handleGetTracks}> SEARCH </a>
      </div>
    );
  }
}

export default SearchBar;
