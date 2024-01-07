import { renderWithQueryClient } from '../utils/test-utils';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';

import Welcome from './Welcome';

describe('HLTVMatches', () => {
  it('should render matches', async () => {
    const result = renderWithQueryClient(<Welcome />);
    const team01 = await result.findByText(/Powerful asynchronous state management/i);
    expect(team01).toBeInTheDocument();
  });
  it('should render loading state', async () => {
    const result = renderWithQueryClient(<Welcome />);
    const loading = await result.findByText(/Loading/i);
    expect(loading).toBeInTheDocument();
  });
  it('should render error state', async () => {
    server.use(
      http.get('/todos/1', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
    const result = renderWithQueryClient(<Welcome />);
    const error = await result.findByText(/Error/i);
    expect(error).toBeInTheDocument();
    // screen.debug();
  });
});
