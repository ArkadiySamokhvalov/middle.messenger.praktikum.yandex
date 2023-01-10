import isObject from './isObject';
import merge from './merge';
import { Indexed } from '../../typings/types';

export default function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}
