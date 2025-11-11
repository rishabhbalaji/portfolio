// src/App.tsx
import { Routes, Route } from 'react-router-dom'

// Import our components
import MainLayout from './components/MainLayout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import CertsPage from './pages/CertsPage'

function App() {
  return (
    <Routes>
      {/* The MainLayout wraps the whole app */}
      <Route path="/" element={<MainLayout />}>
        {/* Our main pages */}
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="certifications" element={<CertsPage />} />

        {/* 404 Route */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App