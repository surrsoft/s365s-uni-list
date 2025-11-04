import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { UnPInterface } from './dpTypes';
import { Un1nListElemWr } from './Un1nListElemWr';
import type { UtWithid } from '../types-ut';

/**
 *
 */
interface ULConfigType<TData = unknown> {
    dataProvider: UnPInterface<TData>,
}

/**
 * !un-list!
 */
export function UniList<TData extends UtWithid = UtWithid>({ dataProvider }: ULConfigType<TData>) {

    const [startIndex, setStartIndex] = useState(0);

    const { data: pgData, isLoading: pgIsLoading, error: pgError, isError: pgIsError } = useQuery({
        queryKey: ['251104114700-upPackageDataGet', startIndex],
        queryFn: async () => {
            return await dataProvider.upPackageDataGet({ start: startIndex });
        },
    });

    console.log('!!-!!-!! 20251104113408', { pgData, pgIsLoading, pgError, pgIsError }); // del+

    if (pgIsLoading) {
        return <div>Загрузка...</div>;
    }

    if (pgIsError) {
        const errorMessage = pgError instanceof Error ? pgError.message : 'Ошибка загрузки данных';
        return <div>Ошибка: {errorMessage}</div>;
    }

    if (pgData && pgData.result === 'fail') {
        return <div>Ошибка: {pgData.failMsg || 'Не удалось загрузить данные'}</div>;
    }

    const data = pgData?.data || [];

    if (data.length < 1) return <div>пустой список</div>

    return <div>
        {data.map((el) => {
            return <Un1nListElemWr key={el.id}>
                hello
            </Un1nListElemWr>
        })}
    </div>;
}