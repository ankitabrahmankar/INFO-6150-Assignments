//Importing express module
import express from 'express';
//Importing controller
import todoController from './../controllers/todo.controller';
/**
 * Todo endpoint route definitions.
 */
const router = express.Router();

/**
 * Search - GET /todos
 * Create - POST /todo
*/
router.route('/todos')
    .get(todoController.index)
    .post(todoController.create);

/**
 * Retrieve - GET /todos/${id}
 * Update - GET /todos/${id}
 * Delete - DELETE /todos/${id}
*/
router.route('/todos/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

export default router;