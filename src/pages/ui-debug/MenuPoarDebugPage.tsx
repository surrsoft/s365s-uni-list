import { useState } from 'react';
import MenuPoar from '../../UniList/MenuPoar/MenuPoar';
import type { DataPoarType } from '../../UniList/MenuPoar/types/DataPoarType';
import type { SelectResultPoarType } from '../../UniList/MenuPoar/types/SelectResultPoarType';

/**
 * Данные для тестового меню
 */
const menuSampleData: DataPoarType = {
  id: 'id-debug-menu-1',
  items: [
    { idAction: 'id-open', text: 'Открыть' },
    { idAction: 'id-edit', text: 'Редактировать' },
    { idAction: 'id-delete', text: 'Удалить' },
  ],
};

/**
 * Страница для отладки компонента MenuPoar
 */
export function MenuPoarDebugPage() {
  const [menuSelection, setMenuSelection] = useState<SelectResultPoarType | null>(null);

  const handleMenuSelection = (selected: SelectResultPoarType) => {
    setMenuSelection(selected);
  };

  return (
    <div>
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
    </div>
  );
}

export default MenuPoarDebugPage;

