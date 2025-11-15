import { UniList } from '../UniList/UniList.tsx';
import { DataProviderJson } from '../UniList/DataProviderJson.tsx';
import type { Gb6bItem } from '../UniList/types.ts';
import type { Un8nCustom } from '../UniList/types/unTypes.ts';
import type { UnPInterface } from "../UniList/types/UnPInterface.ts";


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

const provider = DataProviderJson.getInstance({ unStep: 6, custom }) as UnPInterface<Gb6bItem>;

/** Обёртка в которой формируется провайдер данных !un-provider! */
export function UniListPage() {

  return <UniList<Gb6bItem> dataProvider={provider} />;
}