import type { UnStep } from "../../types";
import type { UtWithid, UtId } from "../../types-ut";
import type { Un2nUiInterface, Un8nCustom, Un3nParams, UnFiltersUiData } from "./unTypes";
import type { Un22nResult, Un4nResult } from "./unTypesUni";

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

    /** Удаление элементов из списка */
    unItemsDelete(params: { ids: UtId[]; }): Promise<Un22nResult>;
}
