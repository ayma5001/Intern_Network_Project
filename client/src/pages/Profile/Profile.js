import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";
import "./Profile.css";
import {withRouter} from "react-router-dom";


function Profile() {
  const [yourUploads, setYourUploads] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/upload/byUser/${localStorage.getItem("username")}`
      ,
      {
        headers :{
          "x-access-token":localStorage.getItem("token")
        }
      }
    ).then((response) => {
      setYourUploads(response.data);
    });
  }, []);
  return (
    <div>
      <div className="Profile">
        <h1>{localStorage.getItem("username")}</h1>
        {yourUploads.map((val) => {
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
                <div> Nbr de Jaime :</div>
                {val.likes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(Profile)

