import { isObject } from './isObject';
import { T_Indexed } from '../../typings/types';

function objectStringify(obj: T_Indexed): string[] {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object' && value !== 'null') {
      return `[${key}]${objectStringify(value)}`;
    } else {
      return `[${key}]=${value}`;
    }
  });
}

export function queryStringify(data: T_Indexed): string | never {
  if (!isObject(data)) {
    throw new Error('input must be an object');
  }

  return Object.entries(data)
    .map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        const results = objectStringify(value);
        return results.map((res) => `${key}${res}`);
      } else {
        return `${key}=${value}`;
      }
    })
    .flat()
    .join('&');
}
