import type { ItemAtPoarType } from './ItemAtPoarType';
import type { IdMenuDataPoarType } from './types';

/**
 * данные описывающие пункты меню
 */
export interface DataPoarType {
  /**
   * идентификатор данных для меню
   */
  id: IdMenuDataPoarType
  /**
   * элементы меню
   */
  items: ItemAtPoarType[]
}
