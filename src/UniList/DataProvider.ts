/**
 * Мы хотим получать данные 
 * 
 * Эджкейсы:
 * - удаление элементов из списка
 */

import type { NumNilPlus, NumOnePlus, DpStartIndex, DpStep, DpId } from "../types";

/**
 * 
 */
export class DataProvider<TData = any> implements DpInterface<TData> {
    private static instance: DataProvider;
    private constructor() {
    }

    public static getInstance(): DataProvider {
        if (!DataProvider.instance) {
            DataProvider.instance = new DataProvider();
        }
        return DataProvider.instance;
    }

    dataGet(params: { start: DpStartIndex; step: DpStep; filter?: DpFilterType; sort?: DpSortType; }): Promise<DpResultType<TData[]>> {
        return Promise.resolve({
            result: 'success',
            data: [],
        });
    }

    itemDelete(params: { id: DpId }): Promise<DpResult2Type> {
        return Promise.resolve({
            result: 'success',
        });
    }
}

interface FailType {
    failMsg?: DpId;
    failCode?: DpId;
}

interface DpResultType<TData = any> extends FailType {
    result: 'success' | 'fail';
    data?: TData;
}

interface DpResult2Type extends FailType {
    result: 'success' | 'fail';
}

interface DpFilterType {
    search?: DpId;
}

type DpSortType = 'asc' | 'desc';


/**
 * 
 */
export interface DpInterface<TData = any> {
    /** ID [[251016220600]] */
    dataGet(params: { start: NumNilPlus, step: NumOnePlus, filter?: DpFilterType, sort?: DpSortType }): Promise<DpResultType<TData[]>>;
    itemDelete(params: { id: DpId }): Promise<DpResult2Type>;
}

