import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import Spotify from "../../util/Spotify"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
       
      ],
      playlistName: "playlist name",
      playlistTracks: [
        
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    // Check if track is in the playlist
    const alreadyExistsTrack = this.state.playlistTracks.find(
      (t) => t.id === track.id
    );
    if (!alreadyExistsTrack) {
      this.setState({
        ...this.state,
        playlistTracks: [...this.state.playlistTracks, track],
      });
    }
  }

  removeTrack(track) {
    const filteredTracks = this.state.playlistTracks.filter(
      (t) => t.id !== track.id
    );
    this.setState({ ...this.state, playlistTracks: filteredTracks });
  }

  updatePlaylistName(name) {
    this.setState({ ...this.state, playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
    });
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
