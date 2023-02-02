import { isObject } from './isObject';
import { Indexed } from '../../typings/types';

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (isObject(rhs[p])) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
