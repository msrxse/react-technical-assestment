import { HttpResponse, http } from 'msw'

const todoItem = {
  name: 'Query',
  description:
    '🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.',
  subscribers_count: 'subscribers_count',
  forks_count: 'forks_count',
}

export const handlers = [
  http.get('/todos/1', () => {
    return HttpResponse.json(todoItem)
  }),

  // ...other request handlers.
]
