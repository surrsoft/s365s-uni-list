import type { DataPoarType } from './DataPoarType';
import type { SelectResultPoarType } from './SelectResultPoarType';

export interface PropsAtPoarType {
  /**
   * Данные описывающие пункты меню
   */
  data?: DataPoarType
  /**
   * Вызывается когда сделан выбор пункта
   * @param el (1) -- выбранный пункт
   */
  cbOnSelected?: (el: SelectResultPoarType) => void
}
