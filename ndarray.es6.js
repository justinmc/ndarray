require("babel/polyfill");

var _array;

class NDArray {
  /**
   * @param {Number} size of first dimension
   * @param {Number} optional size of second dimension
   * etc...
   */
  constructor() {
    this.dimensions = arguments.length;
    this.sizes = Array.from(arguments);

    var sizeFlat = 1;
    this.sizes.forEach((size) => {
      if (size < 1) {
        throw('ERROR: Cannot create array with dimension of size 0');
      }

      sizeFlat *= size;
    });

    _array = new Array(sizeFlat);

    Object.defineProperty(this, 'length', {
      get: function() {
        return _array.length;
      }
    });
  }

  /**
   * @param {Number} index in first dimension
   * etc...
   */
  get() {
    var indices = Array.from(arguments);

    return _array[this._indicesToFlat(indices)];
  }

  /**
   * @param {Number} index in first dimension
   * etc...
   * @param value to store
   */
  set() {
    var indices = Array.from(arguments);
    var value = indices.pop();

    _array[this._indicesToFlat(indices)] = value;
  }

  /**
   * Takes an array of indices, one for each dimension
   * @param {Array} array of indices, one for each dimension
   * @returns {Number} index into _array for this value
   */
  _indicesToFlat(indices) {
    this._validateIndices(indices);

    var indexFlat = 0;
    var multiplier = 1;
    indices.forEach((index, dimension) => {
      if (dimension > 0) {
        multiplier *= this.sizes[dimension - 1];
      }

      indexFlat += index * multiplier;
    });
    return indexFlat;
  }

  /**
   * @param {Array} indices
   * @throws if indices not valid
   */
  _validateIndices(indices) {
    if (indices.length !== this.sizes.length) {
      throw('ERROR: Incorrect number of indices for dimensions');
    }

    indices.forEach((index, dimension) => {
      if (index >= this.sizes[dimension]) {
        throw('ERROR: Index out of bounds');
      }
    });
  }
}

module.exports = NDArray;
