const express = require ('express');
const app = express()
const router = express.Router();
const db = require("./config/db");
const bodyParser= require('body-parser')
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
// support parsing of application/json type post data



// post request and insert data(username,password) in the Users table
/*
router.post('/register', (req, res) => {
console.log(req);
    const username = req.body.username;
    const password = req.body.password;
      db.query(
        "INSERT INTO Users(username,password) VALUES (?,?);",
        [username,password],
        (err,results) => {
          console.log(err);
          res.send(results);
      });
    });
*/

const userRoute = require('./routes/User');
app.use("/user", userRoute); 
const uploadRoute = require('./routes/Upload');
app.use("/upload", uploadRoute); 
app.listen(3001,(req,err) => {
    console.log("Serveur running ...");
});