
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
     
    if (!token) {
      res.send("hey, we need a token, please give it to us next time!")
    } else {
      jwt.verify(token , "jwtSecret", (err,decoded) => {
        if (err) {
          res.json({auth: false, message: "you failed to authenticate"})
        } else {
          req.userId = decoded.id;
          next();
        }
      })
    }
}





// const jwt = require('jsonwebtoken');

// const requireAuth = (req,res, next) => {
//     const token = req.headers["x-access-token"];

//     // check json Web token exists &  is verified 
//     if (token) {
//         jwt.verify(token ,"jwtSecret", (err,decoded) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect('/login')
//             } else {
//                 console.log(decoded);
//                 next();
//             }
//         })
//     }
//     else {
//         res.redirect('/login');
//     }
// }

// module.exports= {requireAuth};


module.exports = {verifyJWT};
