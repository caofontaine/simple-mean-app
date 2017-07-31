process.env.NODE_ENV = 'test';

var base = process.cwd();
var config = require(base + '/config'),
    mongoose = require('mongoose'),
    posts = require(base + '/controllers/posts'),
    Post = require(base + '/models/posts'),
    should = require('should'),
    testUtils = require(base + '/test/utils');
    
describe("Post API", function() {
  var dummyPost, id;
  before(function(done) {
    mongoose.connect(config.testDB, function() {
      console.log('Connected to: ' + config.testDB);
      done(); //So nothing else can run until database connection is done.
    });
    
    dummyPost = new Post({
      'title': 'Dummy',
      'author': 'Someone',
      'body': 'Lorem Ipsum Dior'
    });
    
    dummyPost.save(function(err, post) {
      if(err) { res.send(err); }
      id = post._id;
    });
  });
  
  // Test creating a post. 
  describe("Create Post", function() {
    it("should create a new post", function(done) {

      var req = {
        body: {
          'title': 'Blah Blah',
          'body': 'Blah Blah Blah'
        }
      };

      var res = testUtils.responseValidator(200, function(post) {
        post.should.have.property('title');
        post.title.should.equal('Blah Blah');
        post.should.have.property('body');
        post.body.should.equal('Blah Blah Blah');
        done();
      });

      posts.createPost(req, res);
    });
  });
  
  // Test getting all posts. 
  describe("GET Posts", function() {
    it("should get an array of posts", function(done) {

      var req = {};

      var res = testUtils.responseValidator(200, function(posts) {
        posts.length.should.equal(2);
        done();
      });

      posts.getPosts(req, res);
    });
  });
  
  // Test getting one post. 
  describe("GET Post", function() {
    it("should get a post object by id", function(done) {

      var req = {
        params: {
          id: id
        }
      };

      var res = testUtils.responseValidator(200, function(post) {
        post.title.should.equal('Dummy');
        post.author.should.equal('Someone');
        done();
      });

      posts.getPost(req, res);
    });
    
    // Test error
    it("should throw an error for invalid post id", function(done) {

      var req = {
        params: {
          id: 'sdfhjdk45'
        }
      };

      var res = testUtils.responseValidator(500, function(err) {
        done();
      });

      posts.getPost(req, res);
    });
  });
  
  
  // Clear data from test database and close connection.
  after(function(done) {
    Post.remove({}, function(err) {
      if(err) { console.log(err); };
    });
    mongoose.disconnect(done);
  });
});