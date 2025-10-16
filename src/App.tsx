import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import { UniList } from './UniList/UniList'
import { paths } from './constants'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home.base} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={paths.about.base} element={<About />} />
          <Route path={paths.uniList.base} element={<UniList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
