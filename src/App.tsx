import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Welcome from './components/Welcome';

import styles from './App.module.css';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-id" className={styles.app}>
        <Welcome />
      </div>
    </QueryClientProvider>
  );
};

export default App;
