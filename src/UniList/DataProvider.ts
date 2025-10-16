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

export interface DpInterface<TData = any> {
    pageGet(params: { page: NumNilPlus, pageSize: NumOnePlus }): Promise<DpResultType<TData[]>>;
    itemDelete(params: { id: StrFullType[] }): Promise<DpResult2Type>;
}

