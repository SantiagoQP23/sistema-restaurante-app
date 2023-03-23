import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import 'nprogress/nprogress.css';

import App from './App'

import { SocketProvider } from './context'
import { store } from './redux';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <SocketProvider>

        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
)
