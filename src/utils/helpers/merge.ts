import { isObject } from './isObject';
import { T_Indexed } from '../../typings/types';

export function merge(lhs: T_Indexed, rhs: T_Indexed): T_Indexed {
  for (const p in rhs) {
    if (!Object.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (isObject(rhs[p])) {
        rhs[p] = merge(<T_Indexed>lhs[p], <T_Indexed>rhs[p]);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
