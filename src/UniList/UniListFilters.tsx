import type { UnFiltersUiData, UnSfData, UnInpType } from './unTypes';
import { UniListFilterInput } from './UniListFilterInput';

interface UniListFiltersProps {
    filtersUiData: UnFiltersUiData;
    filters: UnSfData;
    onFilterChange: (filterId: string, filterType: UnInpType, value: any) => void;
}

/**
 * Компонент блока фильтров
 */
export function UniListFilters({ filtersUiData, filters, onFilterChange }: UniListFiltersProps) {
    if (!filtersUiData.items || filtersUiData.items.length === 0) {
        return null;
    }

    return (
        <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            border: '1px solid #ccc', 
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Фильтры</h3>
            {filtersUiData.items.map(filter => (
                <UniListFilterInput
                    key={filter.id}
                    filter={filter}
                    filters={filters}
                    onFilterChange={onFilterChange}
                />
            ))}
        </div>
    );
}

