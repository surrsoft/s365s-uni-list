import { useMemo, useState } from 'react';
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

    console.log('!!-!!-!! 20251104113408', { pgData, pgIsLoading, pgError, pgIsError }); // del+

    if (pgIsLoading) {
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
    const data = pgData?.data || [];
    const hasMore = pgData?.hasMore || false;
    const step = dataProvider.unStepGet();

    if (data.length < 1) return <div>{unLocale.emptyList}</div>

    return <div>
        {data.map((el) => {
            const jsx = dataProvider.jsxGet({ item: el });
            return <Un1nListElemWr key={el.id}>
                {jsx}
            </Un1nListElemWr>
        })}
        {hasMore && <button onClick={() => setStartIndex(startIndex + step)}>{unLocale.loadMore}</button>}
    </div>;
}