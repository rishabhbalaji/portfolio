// src/components/MainLayout.tsx
import { Outlet } from 'react-router-dom' // This renders the active page
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet /> {/* Pages (HomePage, etc.) will render here */}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout