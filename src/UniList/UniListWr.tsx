import { useMemo } from 'react';
import { UniList } from './UniList.tsx';
import { DataProviderJson } from './DataProviderJson.tsx';
import type { Dp5pItem } from './types.ts';
import type { UnPInterface } from './dpTypes.ts';

/** Обёртка в которой формируется провайдер данных !un-provider! */ 
export function UniListWr() {
  const provider = useMemo(() => {
    return DataProviderJson.getInstance({ unStep: 5 }) as UnPInterface<Dp5pItem>;
  }, []);

  return <UniList<Dp5pItem> dataProvider={provider} />;
}