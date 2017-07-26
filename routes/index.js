var express = require('express');
var router = express.Router();
var base = process.env.PWD;
var posts = require(base + '/controllers/posts');

router.get('/posts', posts.getPosts);
router.post('/post/create', posts.createPost);

module.exports = router;