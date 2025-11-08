import type { ItemAtPoarType } from './ItemAtPoarType';

/**
 * данные описывающие пункты меню
 */
export interface DataPoarType {
  /**
   * идентификатор данных
   */
  id: string
  /**
   * элементы меню
   */
  items: ItemAtPoarType[]
}
