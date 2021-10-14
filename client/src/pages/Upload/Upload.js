import React, { useState } from "react";
import "./Upload.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { uploadFiles } from "../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const isUpl = useSelector((state) => state.isUpl);

  let history = useHistory();

  const upload = () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "s2ikyyib");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/dlfa3w3az/image/upload`,
        formData,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        const fileName = response.data.public_id;
        axios.post(
          "http://localhost:3001/upload",
          {
            title: title,
            description: description,
            image: fileName,
            author: localStorage.getItem("username"),
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
      })
      .then(() => {
        history.push("/");
        dispatch(uploadFiles());
      });
  };
  return (
    <div className="upload">
      <h1>Create a post</h1>
      <div className="uploadForm">
        <input
          type="text"
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Description..."
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <input
          type="file"
          onChange={(event) => {
            setImage(event.target.files);
          }}
        />
        <button onClick={upload}>Upload</button>
      </div>
    </div>
  );
}

export default withRouter(Upload);
