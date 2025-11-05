/**
 * Мы хотим получать данные 
 * 
 * Эджкейсы:
 * - удаление элементов из списка
 */

import React from "react";
import type { UnStep } from "../types";
import type { UtId, UtWithid } from "../types-ut";
import type { DpConfigType, UnPInterface, Dp3pResult, Dp2pResult, UnFiltersUiData, Dp1pParams } from "./dpTypes";

const JSON_SERVER_URL = 'http://localhost:22157';
const JSON_SERVER_ITEMS_URL = `${JSON_SERVER_URL}/items`;

/**
 * Имплементация под json-server
 */
export class DataProviderJson<TData extends UtWithid = UtWithid> implements UnPInterface<TData> {
    private static instance: DataProviderJson;

    private readonly unStep: UnStep;

    public constructor(config: DpConfigType) {
        this.unStep = config.unStep || 10;
    }

    public static getInstance(config: DpConfigType): DataProviderJson {
        if (!DataProviderJson.instance) {
            DataProviderJson.instance = new DataProviderJson(config);
        }
        return DataProviderJson.instance;
    }

    unStepGet(): UnStep {
        return this.unStep;
    }

    async upPackageDataGet({ start, filters }: Dp1pParams): Promise<Dp2pResult<TData[]>> {
        const limit = this.unStep;
        const response = await fetch(`${JSON_SERVER_ITEMS_URL}?_start=${start}&_limit=${limit}`);

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            throw error;
        }

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

    jsxGet({ item }: { item: TData }): React.ReactNode {
        return <>hello {item.id}</>;
    }
}


