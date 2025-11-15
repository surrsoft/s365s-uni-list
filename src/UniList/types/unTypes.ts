import type { UnStep } from "../../types";
import type { UtNilNum, UtId, UtWithid } from "../../types-ut";

// TODO: перенести в custom
export interface Un2nUiInterface<TData extends UtWithid = UtWithid> {
    jsxGet(params: { item: TData }): React.ReactNode;
}

// --- 

export interface Un3nParams { start: UtNilNum; filters?: UnSfData; sort?: Un12nSortType; }

// --- для !un-filters-ui!

/** !un-f-id! отдельного !un-f-input! */
type UnFId = UtId;

/** Сущность представляющая !un-f-input! (инпут фильтрации, единичный элемент в !un-filters-ui!) */
export interface UnFInputData {
    id: UnFId;
    /** тип инпута */
    type: UnInpType;
    /** заголовок для UI */
    uiTitle?: string;
    /** описание для UI */
    uiDesc?: string;
}

/** 
 * Тип инпута фильтрации - !un-inp-type!
 * 
 * SYNC [251103214301]
 * 
 * searchCommon - дефолтный быстрый поиск по основным полям;
 * select-one - выбор одного значения из списка;
 * select-many - выбор нескольких значений из списка;
 * checkbox - чекбокс;
 * date - дата;
 * number - число;
 * text - текст;
*/
export type UnInpType = 'searchCommon' | 'select-one' | 'select-many' | 'checkbox' | 'date' | 'number' | 'text';

/** Сущность представляющая данные для !un-filters-ui! (UI через который пользователь настраивает фильтрацию списка) */
export interface UnFiltersUiData {
    items: UnFInputData[];
}

// ---

/** Выбранные фильтры - !un-sf-data! */
export interface UnSfData {
    items?: {
        id: UnFId;
        type: UnInpType;
        // SYNC [251103214301] ключи
        value?: {
            'searchCommon'?: { value: string };
            'select-one'?: { id: any };
            'select-many'?: { ids: string[] };
            'checkbox'?: { value: any }; // TODO
            'date'?: { value: any }; // TODO
            'number'?: { value: any }; // TODO
            'text'?: { value: any }; // TODO
        }
    }[];
}

// ---

export type Un12nSortType = 'asc' | 'desc';


/** Конфигурация */
export interface Un11nConfigType {
    unStep?: UnStep;
    /** Показывать ли меню "три точки" на элементах списка */
    menuItemShow?: boolean;
    custom: Un8nCustom;
}

/** ID элемента меню */
export type Un10nMenuItemId = UtId;

/** Данные меню 
 * 
 * {@param onClick} и {@param onClickAsync} - обработчики клика на элемент меню, потребитель 
 * использует один из них; если представлены оба то приоритет у асинхронного варианта;
*/
export interface Un9nMenuData {
    items: {
        id: Un10nMenuItemId;
        uiTitle: string;
        uiDesc?: string;
        onClick?: (params: { id: Un10nMenuItemId; }) => void;
        onClickAsync?: (params: { id: Un10nMenuItemId; }) => Promise<{ success: boolean }>;
    }[];
}

/** Сущности сильно специфичные для провайдера */
export interface Un8nCustom {
    getMenuData(params: { id: UtId; }): Un9nMenuData;
}

