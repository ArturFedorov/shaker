import { Context } from '../../deps.ts';
import { router } from '../Router.ts';

router.get('/items2', (context: Context) => {
  const x = 5;
  context.response.body = 'HEllo2';
});

export default router;
