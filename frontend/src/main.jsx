
import { createRoot } from 'react-dom/client'
import { store } from './redux/store.js'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import 'flowbite';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
