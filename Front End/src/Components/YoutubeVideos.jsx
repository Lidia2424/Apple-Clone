import { useState, useEffect } from "react";
import "../commonResource/css/YoutubeVideos.css";

function YoutubeVideos() {
  const [YoutubeVideos, setVideo] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCYWSc0u7HmirVKhW0VNNaz3BcuH2OGUeo&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet,id&order=date&formate&maxResults=8"
    )
      .then((response) => response.json())
      .then((data) => {
        const youTubeVideosData = data.items;
        setVideo(youTubeVideosData);
      })
      .catch((error) => {
        console.error("Error fetching YouTube videos: ", error);
      });
  }, []);

  return (
    <>
      <section className="youtubeVideoWrapper">
        <div className="allVideosWrapper">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-12">
                <div className="title-wrapper">
                  <br />
                  <h1>Latest Videos</h1>
                  <br />
                </div>
              </div>

              {YoutubeVideos && YoutubeVideos.length > 0 ? (
                YoutubeVideos.map((singleVideo) => {
                  let vidId = singleVideo.id.videoId;
                  let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
                  return (
                    <div key={vidId} className="col-sm-12 col-md-6">
                      <div className="singleVideoWrapper">
                        <div className="videoThumbnail">
                          <a href={vidLink} target="_blank" rel="noopener noreferrer">
                            <img src={singleVideo.snippet.thumbnails.high.url} alt={singleVideo.snippet.title} />
                          </a>
                        </div>
                        <div className="videoInfoWrapper">
                          <div className="videoTitle">
                            <a href={vidLink} target="_blank" rel="noopener noreferrer">
                              {singleVideo.snippet.title}
                            </a>
                          </div>
                          <div className="videoDesc">{singleVideo.snippet.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12">
                  <p>Loading videos...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default YoutubeVideos;
