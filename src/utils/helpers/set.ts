import { isObject } from './isObject';
import { merge } from './merge';
import { T_Indexed } from '../../typings/types';

export function set(
  object: T_Indexed | unknown,
  path: string,
  value: unknown
): T_Indexed | unknown {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<T_Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as T_Indexed, result);
}
