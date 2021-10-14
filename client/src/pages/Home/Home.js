import React, { useEffect, useState } from "react";
import "./Home.css";
import { Image } from "cloudinary-react";
import Axios from "axios";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { withRouter } from "react-router-dom";

function Home() {
  const [uploads, setUploads] = useState([]);
  //const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/upload", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setUploads(response.data);
      //var tempArr = [];
      //response.data.map((val) => {
      // tempArr.push(val.likes);
    });
    // setLikes(tempArr);
    // });
  }, []);

  const likePost = (id) => {
    Axios.post(
      "http://localhost:3001/upload/like",
      {
        userLiking: localStorage.getItem("username"),
        postId: id,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      window.location.reload();
    });
  };
  return (
    <div className="Home">
      {uploads.map((val, key) => {
        return (
          <div className="Post">
            <div className="Image">
              <Image cloudName="dlfa3w3az" publicId={val.image} />
            </div>
            <div className="Content">
              <div className="title">
                {val.title} / by @{val.author}
              </div>
              <div className="description">{val.description}</div>
            </div>
            <div className="Engagement">
              <ThumbUpAltIcon
                id="likeButton"
                onClick={() => {
                  likePost(val.id);
                  //  var tempLikes = uploads;
                  //  tempLikes[key].likes = tempLikes[key].likes + 1;
                  // setUploads(tempLikes);
                }}
              />
              {val.likes}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Home);
