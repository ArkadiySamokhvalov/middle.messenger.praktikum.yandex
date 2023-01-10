import isObject from './isObject';
import isArray from './isArray';

type PlainObject<T = any> = {
  [k in string]: T;
};

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isObject(value) || isArray(value);
}

export default function isEqual(
  targetObj: PlainObject,
  sourceObj: PlainObject
): boolean {
  if (Object.keys(targetObj).length !== Object.keys(sourceObj).length) {
    return false;
  }

  return Object.keys(targetObj).every((key) => {
    if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
      if (isArrayOrObject(targetObj[key]) && isArrayOrObject(sourceObj[key])) {
        return isEqual(targetObj[key], sourceObj[key]);
      } else if (targetObj[key] === sourceObj[key]) {
        return true;
      }
    }

    return false;
  });
}
