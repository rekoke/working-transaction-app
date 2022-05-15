import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="App">
        {/* Represents all the children of the layout component */}
        <Outlet />
    </main>
  )
}

export default Layout