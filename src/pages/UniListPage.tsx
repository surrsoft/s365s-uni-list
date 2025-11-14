import { UniList } from '../UniList/UniList.tsx';
import { DataProviderJson } from '../UniList/DataProviderJson.tsx';
import type { Un7nItem } from '../UniList/types.ts';
import type { Un8nCustom, UnPInterface } from '../UniList/unTypes.ts';


const custom: Un8nCustom = {
  getMenuData: ({ id }) => {
    return {
      items: [
        {
          id,
          uiTitle: 'Удалить',
        },
      ],
    };
  },
};

const provider = DataProviderJson.getInstance({ unStep: 6, custom }) as UnPInterface<Un7nItem>;

/** Обёртка в которой формируется провайдер данных !un-provider! */
export function UniListPage() {

  return <UniList<Un7nItem> dataProvider={provider} />;
}