import { isObject } from './isObject';
import { isArray } from './isArray';
import { T_PlainObject } from '../../typings/types';

function isArrayOrObject(value: unknown): value is [] | T_PlainObject {
  return isObject(value) || isArray(value);
}

export function isEqual(
  targetObj: T_PlainObject,
  sourceObj: T_PlainObject
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
