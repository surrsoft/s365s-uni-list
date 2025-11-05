import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UnPInterface } from './dpTypes';
import { Un1nListElemWr } from './Un1nListElemWr';
import type { UtWithid } from '../types-ut';
import { unLocale } from './unLocale';

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
    
    const { data: pgData, isLoading: pgIsLoading, error: pgError, isError: pgIsError } = useQuery({
        queryKey: ['251104114700-upPackageDataGet', startIndex],
        queryFn: async () => {
            return await dataProvider.upPackageDataGet({ start: startIndex });
        },
    });


    // --- accumulatedData - накопленные данные; полученные данные аккумулируются в этом массиве

    const [accumulatedData, setAccumulatedData] = useState<TData[]>([]);

    // Сбрасываем накопленные данные при возврате к началу списка
    useEffect(() => {
        if (startIndex === 0) {
            setAccumulatedData([]);
        }
    }, [startIndex]);

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

    return <div>

        {/* блок с фильтрами */}


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