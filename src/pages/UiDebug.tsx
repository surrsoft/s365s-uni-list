import { useMemo, useState } from 'react';
import MenuPoar from '../UniList/MenuPoar/MenuPoar';
import type { DataPoarType } from '../UniList/MenuPoar/types/DataPoarType';
import type { SelectResultPoarType } from '../UniList/MenuPoar/types/SelectResultPoarType';
import type { UnFiltersUiData, UnSfData, UnInpType } from '../UniList/dpTypes';
import { UniListFilters } from '../UniList/UniListFilters';

const menuSampleData: DataPoarType = {
  id: 'debug-menu',
  items: [
    { idAction: 'open', text: 'Открыть' },
    { idAction: 'edit', text: 'Редактировать' },
    { idAction: 'delete', text: 'Удалить' },
  ],
};

const filtersUiData: UnFiltersUiData = {
  items: [
    {
      id: 'search',
      type: 'searchCommon',
      uiTitle: 'Поиск',
      uiDesc: 'Введите строку поиска',
    },
    {
      id: 'status',
      type: 'select-many',
      uiTitle: 'Статусы',
      uiDesc: 'Через запятую: draft, active, archived',
    },
    {
      id: 'onlyFavorites',
      type: 'checkbox',
      uiTitle: 'Показывать только избранное',
    },
    {
      id: 'createdAt',
      type: 'date',
      uiTitle: 'Дата создания',
    },
  ],
};

function createFiltersValue(filterType: UnInpType, value: any) {
  if (filterType === 'searchCommon' || filterType === 'text' || filterType === 'date' || filterType === 'number') {
    return { value };
  }

  if (filterType === 'select-one') {
    return { id: value };
  }

  if (filterType === 'select-many') {
    return { ids: value };
  }

  if (filterType === 'checkbox') {
    return { value: Boolean(value) };
  }

  return {};
}

export function UiDebug() {
  const [menuSelection, setMenuSelection] = useState<SelectResultPoarType | null>(null);
  const [filtersState, setFiltersState] = useState<UnSfData>({ items: [] });

  const filtersStatePretty = useMemo(() => {
    return JSON.stringify(filtersState, null, 2);
  }, [filtersState]);

  const handleMenuSelection = (selected: SelectResultPoarType) => {
    setMenuSelection(selected);
  };

  const handleFilterChange = (filterId: string, filterType: UnInpType, value: any) => {
    setFiltersState((prev) => {
      const items = prev.items ?? [];
      const existingIndex = items.findIndex((item) => item.id === filterId);

      const isEmpty =
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);

      if (existingIndex === -1) {
        if (isEmpty) {
          return prev;
        }

        return {
          items: [
            ...items,
            {
              id: filterId,
              type: filterType,
              value: { [filterType]: createFiltersValue(filterType, value) },
            },
          ],
        };
      }

      if (isEmpty) {
        return {
          items: items.filter((item) => item.id !== filterId),
        };
      }

      const nextItems = [...items];
      nextItems[existingIndex] = {
        id: filterId,
        type: filterType,
        value: { [filterType]: createFiltersValue(filterType, value) },
      };

      return { items: nextItems };
    });
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h2 style={{ marginBottom: '12px' }}>MenuPoar</h2>
        <p style={{ marginBottom: '12px' }}>
          Набор тестовых кнопок выпадающего меню. Выбранный пункт отображается ниже.
        </p>
        <MenuPoar data={menuSampleData} cbOnSelected={handleMenuSelection} />
        <pre
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
            minHeight: '80px',
          }}
        >
          {menuSelection ? JSON.stringify(menuSelection, null, 2) : '— нет выбранного пункта —'}
        </pre>
      </section>

      <section>
        <h2 style={{ marginBottom: '12px' }}>UniListFilters</h2>
        <p style={{ marginBottom: '12px' }}>
          Пример набора фильтров с локальным состоянием. Значения отображаются в JSON формате.
        </p>
        <UniListFilters
          filtersUiData={filtersUiData}
          filters={filtersState}
          onFilterChange={handleFilterChange}
        />
        <pre
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
            overflowX: 'auto',
          }}
        >
          {filtersStatePretty}
        </pre>
      </section>
    </div>
  );
}

export default UiDebug;

