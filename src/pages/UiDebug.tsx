import { NavLink, Outlet } from 'react-router-dom';
import { paths } from '../constants';

const navItems = [
  {
    to: '.',
    label: 'Список компонентов',
    end: true,
  },
  {
    to: paths.uiDebug.components.menuPoar.base,
    label: 'MenuPoar',
  },
  {
    to: paths.uiDebug.components.uniListFilters.base,
    label: 'UniListFilters',
  },
];

export function UiDebug() {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              padding: '6px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              backgroundColor: isActive ? '#0d6efd' : 'transparent',
              color: isActive ? '#fff' : '#0d6efd',
              border: '1px solid #0d6efd',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default UiDebug;

