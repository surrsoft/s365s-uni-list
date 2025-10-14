import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #ccc',
        marginBottom: '1rem'
      }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Главная</Link>
        <Link to="/about" style={{ marginRight: '1rem' }}>О нас</Link>
        <Link to="/uni-list">uni-list</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

