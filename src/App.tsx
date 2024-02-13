import { Router } from './Router'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { AuthProvider } from './app/contexts/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />

        <Toaster />
      </AuthProvider>

      <ReactQueryDevtools buttonPosition='bottom-left'/>
    </QueryClientProvider>
  )
}

export default App
