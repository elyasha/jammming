import React, { Component } from "react";
import Track from "../Track/Track";

export default class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks?.map((track) => (
          <Track
            key={track.id}
            track={track}
            isRemoval={this.props.isRemoval}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
          />
        ))}
      </div>
    );
  }
}
