import type { UnStep } from "../types";
import type { UtNilNum, UtId, UtWithid } from "../types-ut";


/**
 * !un-p-interface! - интерфейс провайдера !un-provider!
 */
export interface UnPInterface<TData extends UtWithid = UtWithid> extends Un2nUiInterface<TData> {

    /** !un-step! */
    unStepGet(): UnStep;

    unCustomDataGet(): Un8nCustom;

    /** Показывать ли меню "три точки" (!un-el-menu!) на элементах списка */
    unMenuItemShowGet(): boolean;

    /** 
     * !un-getdata-fun!
     * Получение пакета данных !un-package!
     * ID [[251016220600]] */
    unPackageDataGet(params: Un3nParams): Promise<Un4nResult<TData[]>>;

    /** Получение данных для !un-filters-ui! */
    unInitialFiltersUiDataGet(): UnFiltersUiData;

    /** Удаление элемента из списка */
    itemDelete(params: { id: UtId; }): Promise<Un5nResult>;
}

export interface Un2nUiInterface<TData extends UtWithid = UtWithid> {
    jsxGet(params: { item: TData }): React.ReactNode;
}

// --- 

export interface Un3nParams { start: UtNilNum; filters?: UnSfData; sort?: Un12nSortType; }

interface Un6nFail {
    failMsg?: UtId;
    failCode?: UtId;
}

export interface Un4nResult<TData = any> extends Un6nFail {
    result: 'success' | 'fail';
    data?: TData;
    /** ошибка; когда result === 'fail' */
    error?: any;
    hasMore?: boolean;
}

export interface Un5nResult extends Un6nFail {
    result: 'success' | 'fail';
}

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

