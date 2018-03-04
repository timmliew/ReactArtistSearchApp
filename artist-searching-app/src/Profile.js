import React from "react";
import "./App.css";

class Profile extends React.Component {
  
  render() {
    let artist = {
      name: "Artist Name",
      followers: { total: 0 },
      images: [{ url: "" }],
      genres: [],
    };
    if (this.props.artist) {
      artist = this.props.artist;
      return (
        <div className="profile">
          <img
            className="profile-img"
            alt="img"
            src={artist.images[0].url}
          />
          <div className="profile-info">
            <div className="profile-info-artist">{artist.name}</div>
            <div className="profile-info-follower">Followers: {artist.followers.total}</div>
            <div className="profile-info-genre"> Genres: {artist.genres.map(
                (value, index) => 
                value = index !== artist.genres.length-1 ? ` ${value}, ` : ` ${value} `
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>No such artist found :(</div>
      );
    }
  }
}

export default Profile;
