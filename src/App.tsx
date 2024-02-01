import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import styles from './App.module.css'
import Workspace from './scenes/Workspace/Workspace'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-id" className={styles.app}>
        <Workspace />
      </div>
    </QueryClientProvider>
  )
}

export default App
