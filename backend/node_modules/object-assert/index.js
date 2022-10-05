/**
 * copyright 2012-2015 Nick Jennings (https://github.com/silverbucket)
 *
 * object-assert is licensed under the MIT license.
 * See the LICENSE file for details.
 *
 * The latest version of node-connection-share can be found here:
 *   git://github.com/silverbucket/object-assert.git
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */

var objectAssert = function () {
  var args = Array.prototype.slice.call(arguments);
  var self = arguments.callee;
  var one = args[0],
      two = args[1];

  function isInArray(val, array) {
    if (!typeof array.length) {
      // array has no length
      return false;
    }

    for (var i = 0, num = array.length; i < num; i += 1) {
      if (typeof val === 'function') {
        if (''+array[i] === ''+val) {
          return true;
        }
      } else {
        if (array[i] === val) {
          return true;
        }
      }
    }
    return false;
  }

  function isEqual(a, b) {
    var p;
    for (p in a) {
      if (b === undefined) { return false; }
      var av, bv;
      try {
        av = a[p];
        bv = b[p];
      } catch(e) {
        self.message = p + ": "+ a[p]+" doesn't match with second object property";
        return false;
      }
      //recursion
      if (typeof av === 'object' || typeof bv === 'object') {
        if (objectAssert(av,bv) !== true){
          return false;
        }
      } else { //simple comparisons
        if(a[p] !== b[p]){
          // support for arrays of different order
          if (!isInArray(a[p],b)) {
            if (!self.message) {
              self.message = p + ": "+ a[p]+" not in second object";
            }
            return false;
          }
        }
      }
    }
    return true;
  }

  // can't use json encoding in case objects contain functions - recursion will fail
  // can't compare non-objects
  if (isEqual(one,two) !== true) {
    return false;
  }
  if (isEqual(two,one) !== true) {
    return false;
  }

  return true;
};


objectAssert.status = true;
objectAssert.message = '';

module.exports = objectAssert;
