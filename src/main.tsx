import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// routage
import AppRouter from '@/routes/AppRouter.tsx';
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './components/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
     </PersistGate>
    </Provider>
  </StrictMode>
);
