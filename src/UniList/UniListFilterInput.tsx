import type { UnFInputData, UnInpType, UnSfData } from './unTypes';

interface UniListFilterInputProps {
    filter: UnFInputData;
    filters: UnSfData;
    onFilterChange: (filterId: string, filterType: UnInpType, value: any) => void;
}

/**
 * Компонент для отображения одного инпута фильтра
 */
export function UniListFilterInput({ filter, filters, onFilterChange }: UniListFilterInputProps) {
    const filterValue = filters.items?.find(item => item.id === filter.id);
    
    switch (filter.type) {
        case 'searchCommon':
        case 'text':
            const textValue = filterValue?.value?.[filter.type]?.value || '';
            return (
                <div key={filter.id} style={{ marginBottom: '10px' }}>
                    {filter.uiTitle && <label style={{ display: 'block', marginBottom: '5px' }}>{filter.uiTitle}</label>}
                    <input
                        type="text"
                        value={textValue}
                        onChange={(e) => onFilterChange(filter.id, filter.type, e.target.value)}
                        placeholder={filter.uiDesc || ''}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
            );
        
        case 'number':
            const numberValue = filterValue?.value?.[filter.type]?.value || '';
            return (
                <div key={filter.id} style={{ marginBottom: '10px' }}>
                    {filter.uiTitle && <label style={{ display: 'block', marginBottom: '5px' }}>{filter.uiTitle}</label>}
                    <input
                        type="number"
                        value={numberValue}
                        onChange={(e) => onFilterChange(filter.id, filter.type, e.target.value ? Number(e.target.value) : null)}
                        placeholder={filter.uiDesc || ''}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
            );
        
        case 'checkbox':
            const checkboxValue = filterValue?.value?.[filter.type]?.value || false;
            return (
                <div key={filter.id} style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="checkbox"
                            checked={!!checkboxValue}
                            onChange={(e) => onFilterChange(filter.id, filter.type, e.target.checked)}
                        />
                        {filter.uiTitle || filter.uiDesc}
                    </label>
                </div>
            );
        
        case 'date':
            const dateValue = filterValue?.value?.[filter.type]?.value || '';
            return (
                <div key={filter.id} style={{ marginBottom: '10px' }}>
                    {filter.uiTitle && <label style={{ display: 'block', marginBottom: '5px' }}>{filter.uiTitle}</label>}
                    <input
                        type="date"
                        value={dateValue}
                        onChange={(e) => onFilterChange(filter.id, filter.type, e.target.value || null)}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
            );
        
        case 'select-one':
            // Для select-one нужны опции, но их нет в интерфейсе, поэтому просто текстовое поле
            const selectOneValue = filterValue?.value?.[filter.type]?.id || '';
            return (
                <div key={filter.id} style={{ marginBottom: '10px' }}>
                    {filter.uiTitle && <label style={{ display: 'block', marginBottom: '5px' }}>{filter.uiTitle}</label>}
                    <input
                        type="text"
                        value={selectOneValue}
                        onChange={(e) => onFilterChange(filter.id, filter.type, e.target.value || null)}
                        placeholder={filter.uiDesc || ''}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
            );
        
        case 'select-many':
            // Для select-many нужны опции, но их нет в интерфейсе, поэтому просто текстовое поле с запятыми
            const selectManyValue = filterValue?.value?.[filter.type]?.ids || [];
            return (
                <div key={filter.id} style={{ marginBottom: '10px' }}>
                    {filter.uiTitle && <label style={{ display: 'block', marginBottom: '5px' }}>{filter.uiTitle}</label>}
                    <input
                        type="text"
                        value={selectManyValue.join(', ')}
                        onChange={(e) => {
                            const ids = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                            onFilterChange(filter.id, filter.type, ids);
                        }}
                        placeholder={filter.uiDesc || 'Введите значения через запятую'}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>
            );
        
        default:
            return null;
    }
}

