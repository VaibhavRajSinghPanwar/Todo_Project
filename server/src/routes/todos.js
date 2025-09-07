const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const { validateTodoFieldsFromBody, validateQueryParams } = require('../middlewares/validate');

router.get('/', validateQueryParams, asyncHandler(getTodos));
router.post('/', validateTodoFieldsFromBody, asyncHandler(createTodo));
router.get('/:todoId', asyncHandler(getTodoById));
router.put('/:todoId', validateTodoFieldsFromBody, asyncHandler(updateTodo));
router.delete('/:todoId', asyncHandler(deleteTodo));

module.exports = router;