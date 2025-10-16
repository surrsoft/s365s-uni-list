/**
 * Мы хотим получать данные 
 * 
 * Эджкейсы:
 * - удаление элементов из списка
 */

import type { NumNilPlus, NumOnePlus, StrFullType } from "../types";

/**
 * 
 */
export class DataProvider {
    private static instance: DataProvider;
    private data: any[] = [];
    private constructor() {
    }

    public static getInstance(): DataProvider {
        if (!DataProvider.instance) {
            DataProvider.instance = new DataProvider();
        }
        return DataProvider.instance;
    }

}

interface FailType {
    failMsg?: StrFullType;
    failCode?: StrFullType;
}

interface DpResultType<TData = any> extends FailType {
    result: 'success' | 'fail';
    data?: TData;
}

interface DpResult2Type extends FailType {
    result: 'success' | 'fail';
}

interface DpFilterType {
    search?: StrFullType;
}

type DpSortType = 'asc' | 'desc';


/**
 * 
 */
export interface DpInterface<TData = any> {
    /** ID [[251016220600]] */
    dataGet(params: { start: NumNilPlus, step: NumOnePlus, filter?: DpFilterType, sort?: DpSortType }): Promise<DpResultType<TData[]>>;
    itemDelete(params: { id: StrFullType }): Promise<DpResult2Type>;
}

