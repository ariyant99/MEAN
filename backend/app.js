const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// bodyParser middleware to for post request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use to set response header for CORS error
app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Mehtods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next()
})

// Handle all requests

app.post('/api/posts',(req, res)=> {
  const post = req.body;
  console.log(post);
  res.status(201).json({message: "Post added Successfully."});
})

app.get('/api/posts',(req, res) => {
  const posts = [
    {
      id: "yugfevirubgr",
      title : "First post",
      content : "Content of first post"
    },
    {
      id: "643q8itggr",
      title : "Second post",
      content : "Content of Second post"
    }
  ]
  res.status(200).json({
    message: "Posts fetched successfully...",
    posts: posts
  })
})

module.exports = app;
