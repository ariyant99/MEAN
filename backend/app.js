//jnDd3LibAZbdxkGf
// mongosh "mongodb+srv://cluster0.ei2en.mongodb.net/myFirstDatabase" --apiVersion 1 --username testuser --password jnDd3LibAZbdxkGf
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./schema/post");

const app = express();

mongoose.connect("mongodb+srv://testuser:jnDd3LibAZbdxkGf@cluster0.ei2en.mongodb.net/MEAN?retryWrites=true&w=majority")
.then(()=> {
  console.log("Connected to database!!")
})
.catch(()=> {
  console.log("Failed to connect database...")
})

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
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next()
})

// Handle all requests

app.post('/api/posts',(req, res)=> {

  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  console.log(post);
  post.save().then(result => {
    res.status(201).json({
      message: "Post added Successfully.",
      postId : result._id
    });
  });
})

app.get('/api/posts',(req, res) => {
  const posts = Post.find()
  .then(documnets => {
    res.status(200).json({
      message: "Posts fetched successfully...",
      posts: documnets
    })
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({
      _id: req.params.id
    })
    .then(result =>{
      console.log("Deleted one", result)
      res.status(200).json({message: "Post Deleted.."})
    });
  });

module.exports = app;
