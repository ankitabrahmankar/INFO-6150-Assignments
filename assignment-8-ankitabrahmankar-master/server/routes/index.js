//importing routes from todo.routes.js
import TodoRouter from './todo.routes';

export default (app) => {
  app.use('/', TodoRouter);
};