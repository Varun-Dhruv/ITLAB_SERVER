var assert = require("assert");
const {
    validatePost,
    validateComment
} = require("../models/post");


describe('Validate Post:', function () {
    describe('Test Case 1: Correct Details', function () {
      it('should return success message', function () {
        const res = validatePost({
         description: 'This is the content',
         tags: ['tag1','tag2']
        })
        assert.equal(typeof (res.error) === 'undefined', true);
      });
    });
    describe('Test Case 2: Incorrect Details', function () {
      it('should return error', function () {
        const res =  validatePost({
          Content: 1223,
          description: 'This is the content',
          tags: ['tag1','tag2']
         })
        assert.equal(typeof (res.error) === 'undefined', false);
      });
    });
    describe('Test Case 3: Correct Details', function () {
      it('should return success message', function () {
        const res =  validatePost({
          description: 'This is the description',
          tags: ['noman','varun','rupin','shlok']
         })
        assert.equal(typeof (res.error) === 'undefined', true);
      });
    });
    describe('Test Case 4: Missing Details', function () {
      it('should return error message as tags variable type is different', function () {
        const res =  validatePost({
          Content: 'This is the content',
          description: 'This is the content',
          tags: 123
         })
        assert.equal(typeof (res.error) === 'undefined', false);
      });
    });
  
  });
  

describe('Validate Comment:', function () {
  describe('Test Case 1: Correct Details', function () {
    it('should return success message', function () {
      const res = validateComment({
       postPostId: 12,
       userUserId: 12,
       comment: 'The content is this'
      })
      
      assert.equal(typeof (res.error) === 'undefined', true);
    });
  });
  describe('Test Case 2: Incorrect Details', function () {
    it('should return error message as postID must be string', function () {
      const res =  validateComment({
        postPostId: 'a12',
        userUserId: 12,
        comment: 'The content is this'
       })
      assert.equal(typeof (res.error) === 'undefined', false);
    });
  });
  describe('Test Case 3: Correct Details', function () {
    it('should return success message', function () {
      const res = validateComment({
        postPostId: 100,
        userUserId: 12,
        comment: 'Hence this gives correct '
       })
      assert.equal(typeof (res.error) === 'undefined', true);
    });
  });
  describe('Test Case 4: Missing Details', function () {
    it('should return error message', function () {
      const res =  validateComment({
        postPostId: 12,
        comment: 12
       })
      assert.equal(typeof (res.error) === 'undefined', false);
    });
  });

});

