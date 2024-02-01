import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import styles from './App.module.css'
import WorkspaceContainer from './scenes/WorkspaceContainer'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-id" className={styles.app}>
        <WorkspaceContainer />
      </div>
    </QueryClientProvider>
  )
}

export default App
