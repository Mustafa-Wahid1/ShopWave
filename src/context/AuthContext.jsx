import { createContext, useContext, useEffect, useState } from 'react'
import storage from '../utils/storage'

const AuthContext = createContext(null)
const USER_KEY = 'user'
const USERS_KEY = 'registered_users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(USER_KEY, null))

  useEffect(() => {
    storage.set(USER_KEY, user)
  }, [user])

  // Frontend-only "auth" — persists a mock user list in localStorage.
  // No real backend exists; this simulates the flows for demo purposes.
  const register = ({ name, email, password }) => {
    const users = storage.get(USERS_KEY, [])
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'An account with this email already exists.' }
    }
    const newUser = { id: Date.now(), name, email, password }
    storage.set(USERS_KEY, [...users, newUser])
    setUser({ id: newUser.id, name, email })
    return { success: true }
  }

  const login = ({ email, password }) => {
    const users = storage.get(USERS_KEY, [])
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      return { success: false, message: 'Invalid email or password.' }
    }
    setUser({ id: found.id, name: found.name, email: found.email })
    return { success: true }
  }

  const logout = () => setUser(null)

  const resetPassword = (email) => {
    const users = storage.get(USERS_KEY, [])
    const exists = users.some((u) => u.email === email)
    return exists
      ? { success: true, message: 'Password reset instructions have been sent.' }
      : { success: false, message: 'No account found with that email.' }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
