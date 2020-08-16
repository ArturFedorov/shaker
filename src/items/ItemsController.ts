import { RouterContext } from '../../deps.ts';
import { router } from '../Router.ts';

router.get('/items', (context: RouterContext) => {
  context.response.body = 'HEllo';
});

export default router;
