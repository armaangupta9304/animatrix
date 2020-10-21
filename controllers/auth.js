//* Import Statements *//
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//* Endpoints *//
exports.postAuth = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  User.userModel
    .find({ email: email })
    .then((doc) => {
      console.log(doc);
      if (doc.length > 0) {
        return res.json({
          message:
            "Authentication Error A User With That Email Address Already Exist.",
          _error: 120,
        });
      } else {
        let hashed;
        bcrypt
          .hash(password, 10)
          .then((result) => {
            hashed = result;
            const newUser = User.userModel({ username, email, password: hashed });
            newUser
              .save()
              .then((doc) => {
                req.session.user = doc
                req.session.isLoggedin = true;
                res.redirect('/api/v1/')
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({
                  message: "The Server Screwed Up!",
                  _error: 121,
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSignin = (req, res, next) => {
  const password = req.body.password
  User.userModel.findOne({username: req.body.username}).then(result => {
    console.log(result)
    bcrypt.compare(password, result.password).then(compared => {
      if(compared){
        console.log('hemlo authed')
        req.session.isLoggedin = true;
        req.session.user = result;
        res.redirect('/api/v1/');
      } else {
        res.redirect('/api/v1/signin')
      }
    }).catch(err => {
      console.log(err)
      res.redirect('/api/v1/signin')
    })
  }).catch(err => {
    console.log(err)
    res.redirect('/api/v1/signin')
  })
}