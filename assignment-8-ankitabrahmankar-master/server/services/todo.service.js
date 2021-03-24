/**
 * Service for todo operations.
 */

import Todo from './../models/todo';
/**
 * Returns an array of todo objects.
 *
 * @param {Object} params {Search parameters}
 */
const search = (filter) => {
    const promise = Todo.find(filter).exec();
    return promise;
};

/**
 * Returns the todo object matching the id.
 *
 * @param {string} todoId {Id of the todo object}
 */
const get = (id) => {
    const promise = Todo.findById(id).exec();
    return promise;
}
/**
 * Saves and returns the new todo object.
 *
 * @param {Object} Todo {Todo object}
 */
const create = (newTodo) => {
    const todo = new Todo(newTodo);
    const promise = todo.save();
    return promise;
}

/**
 * Updates and returns the todo object.
 *
 * @param {Object} Todo {Todo object}
 */
const update = (id, updatedTodo) => {
    const promise = Todo.findByIdAndUpdate(
        { _id: id },
        updatedTodo,
        { new: true }
    ).exec();
    return promise;
}

/**
 * Deletes the todo object matching the id.
 *
 * @param {string} todoId {Id of the todo object}
 */
const remove = (id) => {
    const promise = Todo.remove({ _id: id }).exec();
    return promise;
}


//Exporting all the services
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove
}