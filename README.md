# ndarray

Multidimensional arrays in javascript

## Installation

    npm install tiny-ndarray

## Require

    var NDArray = require('tiny-ndarray');

## Usage

    // Create your array by passing in the size of each dimension
    // Here we're creating a 3D array of size 10x20x4
    var ndArray = new NDArray(10, 20, 4);

    // Set values by passing in the indices, then the value
    ndArray.set(1, 2, 3, 'im a value');

    // Get values by passing the indices in the same way
    ndArray.get(1, 2, 3); // 'im a value'

## Development

The source is written in ECMAScript6 thanks to [Babel](https://babeljs.io/), so you'll have to compile any changes like this:

    babel ndarray.es6.js > ndarray.js

## Running the Tests

    mocha

## License

This project is licensed under the MIT license.  See the LICENSE file for more.
