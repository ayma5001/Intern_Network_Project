const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

//post request and insert data(username,password) in the Users table
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO Users(username,password) VALUES (?,?);",
    [username, password],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

// const verifyJWT = (req, res, next) => {
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     res.send("hey, we need a token, please give it to us next time!")
//   } else {
//     jwt.verify(token , "jwtSecret", (err,decoded) => {
//       if (err) {
//         res.json({auth: false, message: "you failed to authenticate"})
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     })
//   }

// }

// get request to verify if user was authenticated
//  router.get('/isUserAuth',verifyJWT,(req, res) => {
//     res.send("you are authenticated !")
//   })

//post request to make the login and the token
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM Users WHERE username = ?",
    username,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        if (password == results[0].password) {
          const id = results[0].id;
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 300,
          });
          //res.json({loggedIn: true , username:username});
          res.json({ auth: true, token: token, results: results });
        } else {
          //res.json({loggedIn: false , message:"Wrong username or password !"});
          res.json({ auth: false, message: "Wrong username or password" });
        }
      } else {
        //res.json({loggedIn: false , message:"User doesn't exist"});
        res.json({ auth: false, message: "User doesn't exist" });
      }
    }
  );
});

module.exports = router;
