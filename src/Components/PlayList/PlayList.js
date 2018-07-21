import React, { Component } from 'react';
import './PlayList.css';

class PlayList extends Component {
  render() {
    return (
      <div className="Playlist">
            <input value='New Playlist' />

                  <div class="TrackList">
                  <div class="Track">
                    <div class="Track-information">
                      <h3>Stronger</h3>
                        <p>Britney Spears | Oops!... I Did It Again</p>
                      </div>
                     <a class="Track-action">-</a>
                    </div>
                    <div class="Track">
                      <div class="Track-information">
                          <h3>So Emotional</h3>
                          <p>Whitney Houston | Whitney</p>
                          </div>
                        <a class="Track-action">-</a>
                      </div>
                    <div class="Track">
                      <div class="Track-information">
                        <h3>It's Not Right But It's Okay</h3>
                        <p>Whitney Houston | My Love Is Your Love</p>
                      </div>
                      <a class="Track-action">-</a>
                    </div>
                  </div>
                <a class="Playlist-save">SAVE TO SPOTIFY</a>
        </div>
    );
  }
}

export default PlayList;
