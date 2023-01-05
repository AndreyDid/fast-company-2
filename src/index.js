import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from './app/store/createStore'
import reportWebVitals from './reportWebVitals'
import history from './app/utils/history'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
)
reportWebVitals()
