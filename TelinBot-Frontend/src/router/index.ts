import { createBrowserRouter } from 'react-router-dom';
import { dashboardRoutes } from './dashboard';
import { authRoutes } from './auth';
import { chatbotRoutes } from './chatbot';
import { rootRoutes } from './root';

const routes = [rootRoutes, dashboardRoutes, authRoutes, chatbotRoutes];

const router = createBrowserRouter(routes);

export default router;
