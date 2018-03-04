import React from "react";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import "./App.css";
import Profile from "./Profile";
import Gallery from "./Gallery";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
let loginVal = "Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      loginVal = "Logged In";
    };
    this.state = {
      query: "Artist Name",
      artist: null,
      tracks: []
    };
    this.getHashParams = this.getHashParams.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  searchArtist() {
    let currComponent = this;
    spotifyApi.searchArtists(this.state.query)
      .then(function(data) {
        const dataArtist = data.artists.items[0];
        currComponent.setState({ 
          artist: dataArtist
        });
      }, function(err) {
        console.error(err);
      });
    spotifyApi.searchTracks('artist:'+ this.state.query)
     .then(function(data) {
       const tracks = data.tracks;
       currComponent.setState({ tracks });
     }, function(err) {
       console.error(err);
     });
  }

  render() {
    return (
      <div className="Master">
        <FormGroup className="Header">
          <form action="http://localhost:8888">
            <input className="login-button" type="submit" value={loginVal}/>
          </form>
          <h1>Search for your artist</h1>
          <InputGroup>
            <FormControl
              type="text"
              query={this.state.query}
              placeholder="Artist of your choice..."
              onChange={e => this.setState({ query: e.target.value })}
              onKeyPress={e => {
                if (e.key === "Enter") this.searchArtist();
              }}
            />
            <InputGroup.Addon onClick={() => this.searchArtist()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
              <div className="Profile">
                <Profile artist={this.state.artist} />
              </div>
              <div className="Gallery">
                <Gallery tracks={this.state.tracks} />
              </div>
            </div>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
