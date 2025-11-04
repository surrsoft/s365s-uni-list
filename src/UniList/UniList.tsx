import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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

    const params = useMemo(() => ({ start: 0 }), []);

    const { data, isLoading, error } = useQuery({
        queryKey: ['251104114700-upPackageDataGet'],
        queryFn: async () => {
            return await dataProvider.upPackageDataGet(params);
        },
    });

    console.log('!!-!!-!! 20251104113408', { data, isLoading, error }); // del+

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки данных</div>;
    }

    return <div>UniList</div>
}