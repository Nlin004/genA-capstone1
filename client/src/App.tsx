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
  // This is the client-side auth state. we read from localStorage then set.
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  // In other words, we READ token from local storage, put that in the react state 'token'
  // then render nabar
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Navbar is outside Routes so it appears on every page. */}
        <Navbar token={token} />
        
        {/* ACTUAL CLEANUP for logout clicked.  */}
        
        <Routes>
          {/* Login and signup are public pages. Each page updates App's token state after success. */}
          <Route path="/login" element={<Login onAuthenticated={setToken} />} />
          <Route path="/signup" element={<Signup onAuthenticated={setToken} />} />
          {/* ProtectedRoute decides whether Home can render based on token presence. */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/new" element={<ProtectedRoute token={token}><RecipeEditor /></ProtectedRoute>} />
          <Route path="/recipes/:id/edit" element={<ProtectedRoute token={token}><RecipeEditor /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute token={token}><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute token={token}><Profile /></ProtectedRoute>} />
          <Route path="/load" element={<Load />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
