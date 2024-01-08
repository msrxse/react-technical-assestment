import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import styles from './App.module.css'
import Welcome from './components/Matches'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-id" className={styles.app}>
        <Welcome />
      </div>
    </QueryClientProvider>
  )
}

export default App
