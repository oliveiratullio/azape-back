//Importo somente a funcão router
import { Router } from 'express';

import DashboardsController from './app/controllers/DashboardsController.js';
import SessionsController from './app/controllers/SessionsController.js';

import authMiddleware from './app/middlewares/auth.js';

const routes = new Router();

//################## PROOF #####################
//Session
routes.post('/proof/session', SessionsController.store);
//################## PROOF #####################

//################## MIDDLEWARE AUTH #####################
routes.use(authMiddleware);
//################## MIDDLEWARE AUTH #####################

//################## AUTH PROOF #####################
//Dashboard
routes.get('/proof/dashboard', DashboardsController.getDashboard);
//################## AUTH PROOF #####################

export default routes;
