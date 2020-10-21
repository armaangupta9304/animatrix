//* Import Statements *//
const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");
const isAuth = require("../handlers/isAuth");
const isAdmin = require("../handlers/isAdmin");
const postRoute = require("../controllers/post");
const render = require("../controllers/render");

//* Endpoints *//
router.get("/", render.getIndex);

//* GET /api/v1/posts
router.get("/posts", isAuth, postRoute.getPosts);

//* GET /api/v1/post/:id
router.get("/post/:_id", postRoute.getById);

//* POST /api/v1/post/new
router.post("/post/new", isAuth, postRoute.postNew);

//* GET /api/v1/signup
router.get("/signup", render.getSignup);

//* POST /api/v1/auth/signup
router.post("/auth/signup", Auth.postAuth);

//* GET /api/v1/signin
router.get("/signin", render.getSignin);

//* POST /api/v1/auth/signin
router.post("/auth/signin", Auth.postSignin);

module.exports = router;
