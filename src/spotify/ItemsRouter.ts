import { Router } from '../../deps.ts';
import {ItemsController} from './ItemsController.ts';

const itemsRouter = new Router();
const controller = new ItemsController();

itemsRouter.get('/items', controller.items);

export default itemsRouter;


