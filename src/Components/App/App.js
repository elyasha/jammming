import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { id: 4, name: "name 4", artist: "artist 1", album: "album 1" },
        { id: 2, name: "name 2", artist: "artist 2", album: "album 2" },
        { id: 3, name: "name 3", artist: "artist 3", album: "album 3" },
      ],
      playlistName: "playlist name",
      playlistTracks: [
        { id: 1, name: "name 1", artist: "artist 1", album: "album 1" },
        { id: 2, name: "name 2", artist: "artist 2", album: "album 2" },
        { id: 3, name: "name 3", artist: "artist 3", album: "album 3" },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render() {
    // console.log(this.state)
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
