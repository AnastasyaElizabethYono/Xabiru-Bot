import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Router
import router from './router';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Styles
import './styles/style.css';
import './styles/utils.css';
import './styles/modern-normalize.css';
import './styles/company-profile.css';
import './styles/company-profile-utils.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/dashboard-utils.css';
import './styles/chatbot.css';
// Redux store
import { store, persistor } from './store';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
