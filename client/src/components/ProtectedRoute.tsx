import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  token: string | null
  children: ReactNode
}

function ProtectedRoute({ token, children }: ProtectedRouteProps) {
  return token ? children : <Navigate to="/login" replace />
  // if toekn IS valid, render HOME (children includesthat)
  // and if not, redirect back to login. 
}

export default ProtectedRoute
