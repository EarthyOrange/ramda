import _curry2 from './internal/_curry2.js';
import _isArray from './internal/_isArray.js';
import _isObject from './internal/_isObject.js';


/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` function. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will be invoked for all key value pairs in the
 * given object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformation The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 */
var evolve2 = _curry2(function evolve2(transformation, object) {
  if (!_isObject(object) && !_isArray(object)) {
    return object;
  }
  var result = object instanceof Array ? [] : {};
  var transformedValue, key, type;
  for (key in object) {
    type = typeof transformation[key];
    if (type === 'function') {
      result[key] = transformation[key](object[key]);
    } else {
      result[key] = object[key];
    }
    transformedValue = result[key];
    if (typeof transformedValue === 'object') {
      result[key] = evolve2(transformation, transformedValue);
    }
  }
  return result;
});
export default evolve2;
