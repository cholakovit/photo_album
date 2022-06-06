import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { store } from './store/store'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './components/Loading'

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)