/**
 * Мы хотим получать данные 
 * 
 * Эджкейсы:
 * - удаление элементов из списка
 */

import type { DpStartIndex, UnStep } from "../types";
import type { UtId } from "../types-ut";
import type { DpConfigType, UnPInterface, DpResult2Type, DpResultType, DpSortType, UnFiltersUiData } from "./dpTypes";

/**
 * 
 */
export class DataProvider<TData = any> implements UnPInterface<TData> {
    private static instance: DataProvider;

    private config?: DpConfigType;
    private unStep?: UnStep;

    public constructor(config: DpConfigType) {
        this.config = config;
        this.unStep = config.unStep;
    }

    public static getInstance(config: DpConfigType): DataProvider {
        if (!DataProvider.instance) {
            DataProvider.instance = new DataProvider(config);
        }
        return DataProvider.instance;
    }

    upPackageDataGet(params: { start: DpStartIndex; filter?: any; sort?: DpSortType; }): Promise<DpResultType<TData[]>> {
        return Promise.resolve({
            result: 'success',
            data: [],
        });
    }

    unInitialFiltersUiDataGet(): UnFiltersUiData {
        return {
            items: [],
        };
    }

    itemDelete(params: { id: UtId }): Promise<DpResult2Type> {
        return Promise.resolve({
            result: 'success',
        });
    }
}


