import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'getDocument',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
