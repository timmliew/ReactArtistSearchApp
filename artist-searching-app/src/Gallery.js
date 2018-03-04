import React from "react";
import "./App.css"

class Gallery extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playingURL: false,
      previewURL: "",
      audio: null
    }
    this.playAudio = this.playAudio.bind(this);
  }

  playAudio(previewUrl){
    let audio = new Audio(previewUrl);
    if(!this.state.playingURL){
      audio.play();
      this.setState({
        playingURL: true,
        previewURL: previewUrl,
        audio
      })
    } else {
      if(this.state.previewURL === previewUrl){
        this.state.audio.pause();
        this.setState({
          playingURL: false
        })
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playingURL: true,
          previewURL: previewUrl,
          audio
        })
      }
    }
  }

  render(){
    let tracksArray = []
    tracksArray = this.props.tracks.items === null ? tracksArray : this.props.tracks.items;
    console.log(tracksArray)
    if (tracksArray){
      return (
        <div>
          {tracksArray.map((key, index) =>
            <div className="album-profile"
            key={index}
            onClick={() => this.playAudio(key.preview_url)}
            >
              <img
              alt="album img"
              src={key.album.images[0].url}
              />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.previewURL === key.preview_url
                    ?  <span>| |</span>
                    :  <span>&#9654;</span>
                  }
                </div>
              </div>
              <div className="track-name">
                {key.name}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default Gallery
