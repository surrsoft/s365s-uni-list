import type { UnStep } from "../types";
import type { UtNilNum, UtNum, UtId } from "../types-ut";


/**
 * !un-p-interface! - интерфейс провайдера !un-provider!
 */
export interface UnPInterface<TData = any> {
    /** 
     * Получение пакета данных !un-package!
     * ID [[251016220600]] */
    upPackageDataGet(params: Dp1pParams): Promise<DpResultType<TData[]>>;

    /** Получение данных для !un-filters-ui! */
    unInitialFiltersUiDataGet(): UnFiltersUiData;

    /** Удаление элемента из списка */
    itemDelete(params: { id: UtId; }): Promise<DpResult2Type>;
}

// --- 

interface Dp1pParams { start: UtNilNum; filter?: UnSfData; sort?: DpSortType; }

interface DpFailType {
    failMsg?: UtId;
    failCode?: UtId;
}

export interface DpResultType<TData = any> extends DpFailType {
    result: 'success' | 'fail';
    data?: TData;
}

export interface DpResult2Type extends DpFailType {
    result: 'success' | 'fail';
}

// --- для !un-filters-ui!

/** !un-f-id! одельного !un-f-input! */
type UnFId = UtId;

/** Сущность представляющая !un-f-input! (инпут фильтрации, единичный элемент в !un-filters-ui!) */
export interface UnFInputData {
    id: UnFId;
    /** 
     * Тип инпута фильтрации
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
    type: 'searchCommon' | 'select-one' | 'select-many' | 'checkbox' | 'date' | 'number' | 'text';
    /** заголовок для UI */
    uiTitle?: string;
    /** описание для UI */
    uiDesc?: string;
}

/** Сущность представляющая данные для !un-filters-ui! (UI через который пользователь настраивает фильтрацию списка) */
export interface UnFiltersUiData {
    items: UnFInputData[];
}

// ---

/** Выбранные фильтры - !un-sf-data! */
export interface UnSfData {
    items?: {
        id: UnFId;
        type: UnFInputData['type'];
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

export type DpSortType = 'asc' | 'desc';


/** Конфигурация */
export interface DpConfigType {
    unStep?: UnStep;
}