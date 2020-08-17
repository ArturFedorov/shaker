import { RouterContext } from '../../deps.ts';
import { router } from '../Router.ts';

router.get('/spotify', (context: RouterContext) => {
  context.response.body = 'HEllo';
});

export default router;
