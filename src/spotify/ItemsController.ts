import { RouterContext } from '../../deps.ts';

export class ItemsController {
  public items = (context: RouterContext) => {
    context.response.body = 'HEllo2';
  }
}

