import type { IdActionPoarType, IdMenuDataPoarType } from './types';

/**
 * представляет результат выбора пункта меню
 */
export interface SelectResultPoarType {
  idElem?: IdMenuDataPoarType
  idAction?: IdActionPoarType
}
