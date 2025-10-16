import { Link, Outlet } from 'react-router-dom'
import { paths } from '../constants'

function Layout() {
  return (
    <div>
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #ccc',
        marginBottom: '1rem'
      }}>
        <Link to={paths.home.baseSlash} style={{ marginRight: '1rem' }}>Главная</Link>
        <Link to={paths.about.baseSlash} style={{ marginRight: '1rem' }}>О нас</Link>
        <Link to={paths.uniList.baseSlash}>uni-list</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

