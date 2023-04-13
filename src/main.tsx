import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'nprogress/nprogress.css';

import App from './App'

import { SocketProvider } from './context'
import { store } from './redux';

export const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <Provider store={store}>
        <SocketProvider>

          <App />
        </SocketProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
