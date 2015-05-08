'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

require('babel/polyfill');

var _array;

var NDArray = (function () {
  /**
   * @param {Number} size of first dimension
   * @param {Number} optional size of second dimension
   * etc...
   */

  function NDArray() {
    _classCallCheck(this, NDArray);

    this.dimensions = arguments.length;
    this.sizes = Array.from(arguments);

    var sizeFlat = 1;
    this.sizes.forEach(function (size) {
      if (size < 1) {
        throw 'ERROR: Cannot create array with dimension of size 0';
      }

      sizeFlat *= size;
    });

    _array = new Array(sizeFlat);

    Object.defineProperty(this, 'length', {
      get: function get() {
        return _array.length;
      }
    });
  }

  _createClass(NDArray, [{
    key: 'get',

    /**
     * @param {Number} index in first dimension
     * etc...
     */
    value: function get() {
      var indices = Array.from(arguments);

      return _array[this._indicesToFlat(indices)];
    }
  }, {
    key: 'set',

    /**
     * @param {Number} index in first dimension
     * etc...
     * @param value to store
     */
    value: function set() {
      var indices = Array.from(arguments);
      var value = indices.pop();

      _array[this._indicesToFlat(indices)] = value;
    }
  }, {
    key: '_indicesToFlat',

    /**
     * Takes an array of indices, one for each dimension
     * @param {Array} array of indices, one for each dimension
     * @returns {Number} index into _array for this value
     */
    value: function _indicesToFlat(indices) {
      var _this = this;

      this._validateIndices(indices);

      var indexFlat = 0;
      var multiplier = 1;
      indices.forEach(function (index, dimension) {
        if (dimension > 0) {
          multiplier *= _this.sizes[dimension - 1];
        }

        indexFlat += index * multiplier;
      });
      return indexFlat;
    }
  }, {
    key: '_validateIndices',

    /**
     * @param {Array} indices
     * @throws if indices not valid
     */
    value: function _validateIndices(indices) {
      var _this2 = this;

      if (indices.length !== this.sizes.length) {
        throw 'ERROR: Incorrect number of indices for dimensions';
      }

      indices.forEach(function (index, dimension) {
        if (index >= _this2.sizes[dimension]) {
          throw 'ERROR: Index out of bounds';
        }
      });
    }
  }]);

  return NDArray;
})();

module.exports = NDArray;

