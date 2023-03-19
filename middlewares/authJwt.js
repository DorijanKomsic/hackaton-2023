const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js"); //Treba li nam ovaj fajl ???
const db = require("../models");
require('dotenv').config();

function UserJWTAuth(req, res, next) {
  const users = '/api/users/';
  const profiles = '/api/profiles/';
  // Skip authorization checking on the following routes: 
  if (req.path === '/' || req.path === auth + 'login' || req.path === auth + 'register' || req.path === '/api-docs') return next();

  //console.log(req.body);
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    req.err = "Missing authorization";
    console.log('Missing authorization');
    return res.status(401).end("Missing authorization");
  }
  // if authHeader is present, split it, else return undefined
  // take the bearer portion of the token away
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      req.err = "Error: Invalid JWT token";
      console.log('JWT ERROR: ' + err);
      return res.status(401).end("Error: Access Denied");
    }

    req.user = user;
    /* 
    console.log(req.path, files + 'getFileReviews');
    console.log(user); */

    if (req.path === profiles + 'profileRegister') {

      if (!user.adminPassword) {
        req.err = "Error: Administrator profile required";
        console.error('JWT ERROR: ' + 'Admin profile required');
        return res.status(401).send("Error: Administrator profile required");
      }
    }

    if (req.path === profiles + 'profileLogin') {
      if (!user.user_id) {
        req.err = "Error: User account required";
        console.error('JWT ERROR: ' + 'User account required');
        return res.status(401).send("Error: User account required");
      }
    }

    if (req.path === auth + 'newUserCount' || req.path === files + 'newFilesCount'
      || req.path === files + 'getFileReviews' || req.path === files + 'handleFileReview') {
      if (!user.profileId) {
        req.err = "Error: Profile Not Present";
        console.error('JWT ERROR: ' + 'Admin role required');
        return res.status(401).send("Error: Access Denied");
      }
    }
    next();
  });
};

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyProfileToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.profileId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
  verifyProfileToken
};
module.exports = authJwt;