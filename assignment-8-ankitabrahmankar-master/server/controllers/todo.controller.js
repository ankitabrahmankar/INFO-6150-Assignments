/**
 * Controller for todo endpoints.
 */
/**
 * Import Todo service
 */
import todoService from './../services/todo.service';
/**
 * Returns a list of todo in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
const index = (request, response) => {
    todoService.search({})
        .then((todos) => {
            response.status(200);
            response.json(todos);
        })
        .catch(handleError(response));
};

/**
 * Returns a todo object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
const get = (request, response) => {
    const id = request.params.id;
   
    todoService.get(id)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};

/**
 * Creates a new todo with the request JSON and
 * returns todo JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
const create = (request, response) => {
    const newTodo = Object.assign({}, request.body);
    todoService.create(newTodo)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};

/**
 * Updates and returns a todo object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
const update = (request, response) => {
    const id = request.params.id;
    const updateTodo = Object.assign({}, request.body);
    todoService.update(id, updateTodo)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};

/**
 * Deletes a todo object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
const remove = (request, response) => {
    const id = request.params.id;
    todoService.remove(id)
        .then((todo) => {
            response.status(200);
            response.json({
                message: "Todo Deleted Successfully!"
            });
        })
        .catch(handleError(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
const handleError = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

//Exporting all the functions 
export default {
    index: index,
    get: get,
    create: create,
    update: update,
    remove: remove
}