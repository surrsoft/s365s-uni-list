import { useMemo } from 'react';
import { UniList } from '../UniList/UniList.tsx';
import { DataProviderJson } from '../UniList/DataProviderJson.tsx';
import type { Un7nItem } from '../UniList/types.ts';
import type { UnPInterface } from '../UniList/dpTypes.ts';

/** Обёртка в которой формируется провайдер данных !un-provider! */ 
export function UniListPage() {
  const provider = useMemo(() => {
    return DataProviderJson.getInstance({ unStep: 6 }) as UnPInterface<Un7nItem>;
  }, []);

  return <UniList<Un7nItem> dataProvider={provider} />;
}