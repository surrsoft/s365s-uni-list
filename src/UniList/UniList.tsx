import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UnPInterface, UnInpType } from './dpTypes';
import { Un1nListElemWr } from './Un1nListElemWr';
import type { UtWithid } from '../types-ut';
import { unLocale } from './unLocale';
import { UniListFilters } from './UniListFilters';
import { useUniListFilters } from './useUniListFilters';

/**
 *
 */
interface Un2nConfig<TData extends UtWithid = UtWithid> {
    dataProvider: UnPInterface<TData>,
}

/**
 * !un-list!
 */
export function UniList<TData extends UtWithid = UtWithid>({ dataProvider }: Un2nConfig<TData>) {

    const [startIndex, setStartIndex] = useState(0);
    const [accumulatedData, setAccumulatedData] = useState<TData[]>([]);

    // Получаем список доступных фильтров
    const filtersUiData = useMemo(() => {
        return dataProvider.unInitialFiltersUiDataGet();
    }, [dataProvider]);

    // Управление фильтрами
    const { filters, handleFilterChange } = useUniListFilters();
    
    const { data: pgData, isLoading: pgIsLoading, error: pgError, isError: pgIsError } = useQuery({
        queryKey: ['251104114700-upPackageDataGet', startIndex, filters],
        queryFn: async () => {
            return await dataProvider.upPackageDataGet({ start: startIndex, filters });
        },
    });


    // --- accumulatedData - полученные данные аккумулируются в этом массиве

    // Сбрасываем накопленные данные при возврате к началу списка или изменении фильтров
    useEffect(() => {
        if (startIndex === 0) {
            setAccumulatedData([]);
        }
    }, [startIndex, filters]);

    // Добавляем новые данные к накопленным
    useEffect(() => {
        if (pgData && pgData.result === 'success' && pgData.data) {
            setAccumulatedData(prev => {
                // Если это первая загрузка (startIndex === 0), заменяем данные
                if (startIndex === 0) {
                    return pgData.data ?? [];
                }
                // Иначе добавляем новые данные, исключая дубликаты по id
                const newItems = (pgData.data ?? []).filter(
                    newItem => !prev.some(item => item.id === newItem.id)
                );
                return [...prev, ...newItems];
            });
        }
    }, [pgData, startIndex]);

    // ---

    console.log('!!-!!-!! 20251104113408', { pgData, pgIsLoading, pgError, pgIsError }); // del+

    if (pgIsLoading && accumulatedData.length === 0) {
        return <div>{unLocale.loading}</div>;
    }

    if (pgIsError) {
        const errorMessage = pgError instanceof Error ? pgError.message : unLocale.errorLoading;
        return <div>{unLocale.errorPrefix}{errorMessage}</div>;
    }

    if (pgData && pgData.result === 'fail') {
        return <div>{unLocale.errorPrefix}{pgData.failMsg || unLocale.errorLoadFailed}</div>;
    }

    console.log('!!-!!-!! 20251105214739', {pgData}); // del+
    const hasMore = pgData?.hasMore || false;
    const step = dataProvider.unStepGet();

    if (accumulatedData.length < 1 && !pgIsLoading) return <div>{unLocale.emptyList}</div>

    // Обработчик изменения фильтра с сбросом данных
    const onFilterChange = (filterId: string, filterType: UnInpType, value: any) => {
        handleFilterChange(filterId, filterType, value, () => {
            setStartIndex(0);
            setAccumulatedData([]);
        });
    };

    return <div>

        {/* блок с фильтрами */}
        <UniListFilters
            filtersUiData={filtersUiData}
            filters={filters}
            onFilterChange={onFilterChange}
        />

        {/* список элементов */}
        {accumulatedData.map((el) => {
            const jsx = dataProvider.jsxGet({ item: el });
            return <Un1nListElemWr key={el.id}>
                {jsx}
            </Un1nListElemWr>
        })}
        {pgIsLoading && accumulatedData.length > 0 && <div>{unLocale.loading}</div>}
        {hasMore && <button onClick={() => setStartIndex(startIndex + step)}>{unLocale.loadMore}</button>}
    </div>;
}