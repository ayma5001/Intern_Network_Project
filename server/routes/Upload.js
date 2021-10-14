const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyJWT } = require("../Middelware/authMiddleware");

//post data(title,description,image,author) into Upload table (link:Home_page).
router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.author;
  db.query(
    "INSERT INTO Uploads(title,description,image,author) VALUES (?,?,?,?);",
    [title, description, image, author],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

// get the data from the Uploads table (link:Home_page)
router.get("/", (req, res) => {
  db.query("SELECT * FROM Uploads", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

//get the username which is passed in the upload table using req.params
router.get("/byUser/:username", (req, res) => {
  const userName = req.params.username;
  db.query(
    "SELECT * FROM Uploads WHERE author = ?",
    userName,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});
//post request to insert the userLiking and postId to the Likes table (link:like)
router.post("/like", (req, res) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;
  db.query(
    "INSERT INTO Likes (userLiking, postId) VALUES (?,?)",
    [userLiking, postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      //request to update the number of likes in Upload table
      db.query(
        "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
        postId,
        (err2, results2) => {
          res.send(results);
        }
      );
    }
  );
});

module.exports = router;
