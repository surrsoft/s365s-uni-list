import { useState } from 'react';
import type { UnSfData, UnInpType } from './unTypes';

/**
 * Хук для управления фильтрами списка
 */
export function useUniListFilters() {
    const [filters, setFilters] = useState<UnSfData>({ items: [] });

    const handleFilterChange = (
        filterId: string, 
        filterType: UnInpType, 
        value: any,
        onReset: () => void
    ) => {
        setFilters(prev => {
            const existingItems = prev.items || [];
            const existingIndex = existingItems.findIndex(item => item.id === filterId);
            
            let newValue: any = {};
            if (filterType === 'searchCommon' || filterType === 'text') {
                newValue = { value: value || '' };
            } else if (filterType === 'select-one') {
                newValue = { id: value };
            } else if (filterType === 'select-many') {
                newValue = { ids: value || [] };
            } else if (filterType === 'checkbox' || filterType === 'date' || filterType === 'number') {
                newValue = { value };
            }

            const newItem = {
                id: filterId,
                type: filterType,
                value: { [filterType]: newValue }
            };

            let updatedItems: typeof existingItems;
            if (existingIndex >= 0) {
                // Обновляем существующий фильтр
                if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
                    // Удаляем фильтр, если значение пустое
                    updatedItems = existingItems.filter(item => item.id !== filterId);
                } else {
                    updatedItems = [...existingItems];
                    updatedItems[existingIndex] = newItem;
                }
            } else {
                // Добавляем новый фильтр, если значение не пустое
                if (value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
                    updatedItems = [...existingItems, newItem];
                } else {
                    updatedItems = existingItems;
                }
            }

            // Сбрасываем данные при изменении фильтров
            onReset();

            return { items: updatedItems };
        });
    };

    return {
        filters,
        handleFilterChange,
    };
}

