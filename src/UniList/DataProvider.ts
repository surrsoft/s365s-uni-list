/**
 * Мы хотим получать данные 
 * 
 * Эджкейсы:
 * - удаление элементов из списка
 */

import type { DpStartIndex, UnStep } from "../types";
import type { UtId } from "../types-ut";
import type { DpConfigType, UnPInterface, Dp3pResult, Dp2pResult, DpSortType, UnFiltersUiData, Dp1pParams } from "./dpTypes";

const JSON_SERVER_URL = 'http://localhost:22157';
const JSON_SERVER_ITEMS_URL = `${JSON_SERVER_URL}/items`;

/**
 * 
 */
export class DataProviderJson<TData = any> implements UnPInterface<TData> {
    private static instance: DataProviderJson;

    private config?: DpConfigType;
    private unStep?: UnStep;

    public constructor(config: DpConfigType) {
        this.config = config;
        this.unStep = config.unStep || 10;
    }

    public static getInstance(config: DpConfigType): DataProviderJson {
        if (!DataProviderJson.instance) {
            DataProviderJson.instance = new DataProviderJson(config);
        }
        return DataProviderJson.instance;
    }

    async upPackageDataGet({ start, filters }: Dp1pParams): Promise<Dp2pResult<TData[]>> {
        const limit = this.unStep;
        const response = await fetch(`${JSON_SERVER_ITEMS_URL}?_start=${start}&_limit=${limit}`);
        const data = await response.json() as TData[];
        return {
            result: 'success',
            data: data as TData[],
        };
    }

    unInitialFiltersUiDataGet(): UnFiltersUiData {
        return {
            items: [],
        };
    }

    itemDelete(params: { id: UtId }): Promise<Dp3pResult> {
        return Promise.resolve({
            result: 'success',
        });
    }
}


