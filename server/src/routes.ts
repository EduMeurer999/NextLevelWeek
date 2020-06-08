import express from 'express';
import knex from './database/connection';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';
const routes = express.Router();

const itemsController = new ItemsController();
const pointsContorller = new PointsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsContorller.create)

routes.get('/points/:id', pointsContorller.show)

routes.get('/points', pointsContorller.index)

export default routes;