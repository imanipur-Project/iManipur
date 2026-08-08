import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  session: Session | null
  user: User | null
  isEditMode: boolean
  toggleEditMode: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const isCmsEnabled = import.meta.env['VITE_ENABLE_CMS'] === 'true';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (!session) setIsEditMode(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleEditMode = () => setIsEditMode((prev) => !prev)
  const signOut = async () => { await supabase.auth.signOut() }

  return (
    <AuthContext.Provider value={{ session, user, isEditMode, toggleEditMode, signOut }}>
      {children}
      {isCmsEnabled && user && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
          <button
            onClick={toggleEditMode}
            className={`px-4 py-2 rounded-none font-mono text-xs uppercase tracking-widest transition-all shadow-card border backdrop-blur-md ${
              isEditMode 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-background/80 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {isEditMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}
          </button>
        </div>
      )}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
