import { Context } from '../../deps.ts';
import { router } from '../Router.ts';

router.get('/items', (context: Context) => {
  context.response.body = 'HEllo';
});

export default router;
