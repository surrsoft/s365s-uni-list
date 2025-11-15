/**
 * Мы хотим получать данные 
 * 
 * Эджкейсы:
 * - удаление элементов из списка
 */

import React from "react";
import type { UnStep } from "../types";
import type { UtId, UtWithid } from "../types-ut";
import type { Un11nConfigType, UnFiltersUiData, Un3nParams, Un8nCustom } from "./types/unTypes";
import type { Un4nResult, Un22nResult } from "./types/unTypesUni";
import type { UnPInterface } from "./types/UnPInterface";

const JSON_SERVER_URL = 'http://localhost:22157';
const JSON_SERVER_ITEMS_URL = `${JSON_SERVER_URL}/items`;

/**
 * Имплементация под json-server
 */
export class DataProviderJson<TData extends UtWithid = UtWithid> implements UnPInterface<TData> {
    private static instance: DataProviderJson;

    private readonly unStep: UnStep;
    private readonly menuItemShow: boolean;
    private readonly custom: Un8nCustom;

    public constructor(config: Un11nConfigType) {
        this.unStep = config.unStep || 10;
        this.menuItemShow = config.menuItemShow || false;
        this.custom = config.custom;
    }

    public static getInstance(config: Un11nConfigType): DataProviderJson {
        if (!DataProviderJson.instance) {
            DataProviderJson.instance = new DataProviderJson(config);
        }
        return DataProviderJson.instance;
    }

    unCustomDataGet() {
        return this.custom;
    }

    unStepGet(): UnStep {
        return this.unStep;
    }
    unMenuItemShowGet(): boolean {
        return this.menuItemShow;
    }

    async unPackageDataGet({ start, filters }: Un3nParams): Promise<Un4nResult<TData[]>> {
        const limit = this.unStep;
        const limitPlus = limit + 1;
        const response = await fetch(`${JSON_SERVER_ITEMS_URL}?_start=${start}&_limit=${limitPlus}`);

        if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            throw error;
        }

        const data = await response.json() as TData[];
        const hasMore = data.length > limit;
        const dataSlice = data.slice(0, limit);
        return {
            result: 'success',
            data: dataSlice as TData[],
            hasMore: hasMore,
        };
    }

    unInitialFiltersUiDataGet(): UnFiltersUiData {
        return {
            items: [

            ],
        };
    }

    unItemsDelete(params: { ids: UtId[] }): Promise<Un22nResult> {
        // TODO: реализовать удаление элементов из списка
        return Promise.resolve({
            result: 'success',
        });
    }


    jsxGet({ item }: { item: TData }): React.ReactNode {
        return <>hello {item.id}</>;
    }
}


