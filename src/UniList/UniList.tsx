import { useMemo } from "react";
import { DataProviderJson } from "./DataProviderJson";

/**
 * 
 */
interface ULConfigType {
    pageSize?: number,
}

/**
 * 
 */
export function UniList({ pageSize = 10 }: ULConfigType) {


    const dataProvider = useMemo(() => {
        const dataProvider = DataProviderJson.getInstance({ unStep: pageSize });
        return dataProvider;
    }, [pageSize]);

    const data = useMemo(() => {
        return dataProvider.upPackageDataGet({ start: 0 });
    }, [dataProvider]);

    console.log('!!-!!-!! 20251104113408', { data }); // del+

    return <div>UniList</div>
}