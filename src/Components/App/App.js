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
        { id: 1, name: "name 1", artist: "artist 1", album: "album 1", uri: 'spotify:track:4JZ8ONMo8AWJQx8NghGBTh' },
        { id: 2, name: "name 2", artist: "artist 2", album: "album 2", uri: 'spotify:track:47PkkYZ45gF2eAgAkUi4I7' },
        { id: 3, name: "name 3", artist: "artist 3", album: "album 3", uri: 'spotify:track:4tNN06VadscPBRkkCrgh0x' },
      ],
      playlistName: "playlist name",
      playlistTracks: [
        { id: 1, name: "name 1", artist: "artist 1", album: "album 1", uri: 'spotify:track:4JZ8ONMo8AWJQx8NghGBTh' },
        { id: 2, name: "name 2", artist: "artist 2", album: "album 2", uri: 'spotify:track:47PkkYZ45gF2eAgAkUi4I7' },
        { id: 3, name: "name 3", artist: "artist 3", album: "album 3", uri: 'spotify:track:4tNN06VadscPBRkkCrgh0x' },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
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
    console.log('save playlist uris')
    console.log(trackURIs);
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
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
