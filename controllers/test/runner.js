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
});