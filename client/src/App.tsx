import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Recipes from './pages/Recipes'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Load from './pages/Load'
import Profile from './pages/Profile'
import RecipeDetail from './pages/RecipeDetail'
import RecipeEditor from './pages/RecipeEditor'
import './App.css'

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  // Clears both React state and localStorage — client.ts stops attaching
  // the Authorization header on the very next request after this runs.
  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar token={token} />
        <Routes>
          <Route path="/login" element={<Login onAuthenticated={setToken} />} />
          <Route path="/signup" element={<Signup onAuthenticated={setToken} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/new" element={<ProtectedRoute token={token}><RecipeEditor /></ProtectedRoute>} />
          <Route path="/recipes/:id/edit" element={<ProtectedRoute token={token}><RecipeEditor /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute token={token}><Dashboard /></ProtectedRoute>} />
          {/* onLogout MUST be passed — Profile calls it in both logout and on 401 */}
          <Route path="/profile" element={
            <ProtectedRoute token={token}>
              <Profile onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          <Route path="/load" element={<Load />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App