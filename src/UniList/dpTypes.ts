import type { UnStep } from "../types";
import type { UtNilNum, UtId, UtWithid } from "../types-ut";


/**
 * !un-p-interface! - интерфейс провайдера !un-provider!
 */
export interface UnPInterface<TData extends UtWithid = UtWithid> extends Un2nUiInterface<TData> {

    /** !un-step! */
    unStepGet(): UnStep;

    /** 
     * Получение пакета данных !un-package!
     * ID [[251016220600]] */
    upPackageDataGet(params: Dp1pParams): Promise<Dp2pResult<TData[]>>;

    /** Получение данных для !un-filters-ui! */
    unInitialFiltersUiDataGet(): UnFiltersUiData;

    /** Удаление элемента из списка */
    itemDelete(params: { id: UtId; }): Promise<Dp3pResult>;
}

export interface Un2nUiInterface<TData extends UtWithid = UtWithid> {
    jsxGet(params: { item: TData }): React.ReactNode;
}

// --- 

export interface Dp1pParams { start: UtNilNum; filters?: UnSfData; sort?: DpSortType; }

interface Dp4pFail {
    failMsg?: UtId;
    failCode?: UtId;
}

export interface Dp2pResult<TData = any> extends Dp4pFail {
    result: 'success' | 'fail';
    data?: TData;
    /** ошибка; когда result === 'fail' */
    error?: any;
    hasMore?: boolean;
}

export interface Dp3pResult extends Dp4pFail {
    result: 'success' | 'fail';
}

// --- для !un-filters-ui!

/** !un-f-id! отдельного !un-f-input! */
type UnFId = UtId;

/** Сущность представляющая !un-f-input! (инпут фильтрации, единичный элемент в !un-filters-ui!) */
export interface UnFInputData {
    id: UnFId;

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

export type DpSortType = 'asc' | 'desc';


/** Конфигурация */
export interface DpConfigType {
    unStep?: UnStep;
}