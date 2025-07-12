
import { createRoot } from 'react-dom/client'
import { store, persistor } from './redux/store.js'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import 'flowbite';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
     </Provider>
  </PersistGate>
  

)
