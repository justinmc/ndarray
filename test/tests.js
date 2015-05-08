var assert = require('assert');
var NDArray = require('../ndarray.js');

describe('NDArray', function(){

  describe('constructor', function(){
    it('should throw an exception for invalid dimension sizes', function() {
      function factory() {
        var sizes = Array.prototype.slice.apply(arguments);
        sizes.unshift(null);

        return function() {
          var NDArrayBound = Function.bind.apply(NDArray, sizes);
          new NDArrayBound();
        }
      }

      assert.throws(factory(0));
      assert.throws(factory(0, 0));
      assert.throws(factory(1, 0));
      assert.throws(factory(1, 2, 23, 233454, 0));
      assert.throws(factory(1, 2, 0, 233454, 99));
    });

    it('should create an internal array with the correct length', function() {
      assert.equal(new NDArray(1).length, 1);
      assert.equal(new NDArray(5).length, 5);
      assert.equal(new NDArray(99999999).length, 99999999);
      assert.equal(new NDArray(4, 16).length, 64);
      assert.equal(new NDArray(4, 16, 2).length, 128);
    });
  });

  describe('_indicesToFlat', function(){
    it('should throw an exception for out of bound indices', function() {
      var oneDArray = new NDArray(10);
      assert.throws(oneDArray._indicesToFlat.bind(oneDArray, [10]));

      var twoDArray = new NDArray(10, 7);
      assert.throws(twoDArray._indicesToFlat.bind(twoDArray, [1, 7]));
      assert.throws(twoDArray._indicesToFlat.bind(twoDArray, [10, 1]));
      assert.throws(twoDArray._indicesToFlat.bind(twoDArray, [10, 7]));

      var threeDArray = new NDArray(10, 7, 3);
      assert.throws(threeDArray._indicesToFlat.bind(threeDArray, [1, 7, 1]));
      assert.throws(threeDArray._indicesToFlat.bind(threeDArray, [10, 1, 1]));
      assert.throws(threeDArray._indicesToFlat.bind(threeDArray, [10, 7, 1]));
      assert.throws(threeDArray._indicesToFlat.bind(threeDArray, [1, 1, 3]));
    });

    it('should return 1d indices directly', function() {
      var ndArray = new NDArray(10);

      assert.equal(ndArray._indicesToFlat([4]), 4);
    });

    it('should calculate from 2d indices correctly', function() {
      var ndArray = new NDArray(4, 8);

      assert.equal(ndArray._indicesToFlat([0, 0]), 0);
      assert.equal(ndArray._indicesToFlat([1, 0]), 1);
      assert.equal(ndArray._indicesToFlat([0, 1]), 4);
      assert.equal(ndArray._indicesToFlat([3, 5]), 23);
    });

    it('should calculate from 3d indices correctly', function() {
      var ndArray = new NDArray(4, 8, 2);

      assert.equal(ndArray._indicesToFlat([0, 0, 0]), 0);
      assert.equal(ndArray._indicesToFlat([1, 0, 0]), 1);
      assert.equal(ndArray._indicesToFlat([0, 1, 0]), 4);
      assert.equal(ndArray._indicesToFlat([3, 5, 0]), 23);
      assert.equal(ndArray._indicesToFlat([3, 5, 1]), 55);
    });
  });

  describe('get', function(){
    it('should get undefined for uninitialized array', function() {
      var ndArray = new NDArray(10);

      assert.equal(ndArray.get(3), undefined);
    });
  });

  describe('set', function(){
    it('should be able to retrieve value set in 1d array', function() {
      var ndArray = new NDArray(5);

      ndArray.set(4, 'lolz');

      assert.equal(ndArray.get(4), 'lolz');
    });

    it('should be able to retrieve value set in 2d array', function() {
      var ndArray = new NDArray(5, 5);

      ndArray.set(4, 4, 'lolz');

      assert.equal(ndArray.get(4, 4), 'lolz');
    });

    it('should be able to retrieve value set in 3d array', function() {
      var ndArray = new NDArray(5, 5, 2);

      ndArray.set(4, 4, 1, 'lolz');

      assert.equal(ndArray.get(4, 4, 1), 'lolz');
    });
  });
});
