import { Link } from 'react-router-dom';
import { paths } from '../../constants';

const uiDebugLinks = [
  {
    to: paths.uiDebug.components.menuPoar.base,
    label: 'MenuPoar',
    description: 'Демо выпадающего меню с фиктивными действиями.',
  },
  {
    to: paths.uiDebug.components.uniListFilters.base,
    label: 'UniListFilters',
    description: 'Пример фильтров со ссылкой на локальные состояния.',
  },
];

export function UiDebugIndex() {
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <header>
        <h1 style={{ marginBottom: '12px' }}>UI Debug</h1>
        <p style={{ margin: 0 }}>
          Подстраницы для просмотра и отладки UI-компонентов. Выберите компонент из списка ниже.
        </p>
      </header>
      <section style={{ display: 'grid', gap: '12px' }}>
        {uiDebugLinks.map((link) => (
          <article
            key={link.to}
            style={{
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
            }}
          >
            <h2 style={{ margin: '0 0 8px' }}>
              <Link to={link.to} style={{ textDecoration: 'none', color: '#0d6efd' }}>
                {link.label}
              </Link>
            </h2>
            <p style={{ margin: 0 }}>{link.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default UiDebugIndex;

