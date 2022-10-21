import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import App from './App'
import { SocketProvider } from './context'
import { store } from './redux';

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <SocketProvider>

        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
)
