var express = require('express');
var router = express.Router();
var base = process.env.PWD;
var posts = require(base + '/controllers/posts');

router.get('/posts', posts.getPosts);
router.get('/posts/:id', posts.getPost);
router.post('/post/create', posts.createPost);
router.put('/posts/:id', posts.updatePost);

module.exports = router;