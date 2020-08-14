import { Router, Context } from '../../deps.ts';

const router = new Router();

router.get('/items', (context: Context) => {
  context.response.body = 'HEllo';
});

export default router;
