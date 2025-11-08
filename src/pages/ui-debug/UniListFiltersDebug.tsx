import { useMemo, useState } from 'react';
import type { UnFiltersUiData, UnSfData, UnInpType } from '../../UniList/dpTypes';
import { UniListFilters } from '../../UniList/UniListFilters';

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

export function UniListFiltersDebug() {
  const [filtersState, setFiltersState] = useState<UnSfData>({ items: [] });

  const filtersStatePretty = useMemo(() => {
    return JSON.stringify(filtersState, null, 2);
  }, [filtersState]);

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
    <div>
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
    </div>
  );
}

export default UniListFiltersDebug;

