import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotesPage } from './pages/NotesPage'
import './styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <NotesPage />
      </div>
    </QueryClientProvider>
  )
}

export default App
