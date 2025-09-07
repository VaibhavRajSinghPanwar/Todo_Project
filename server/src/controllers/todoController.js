const Todo = require('../models/Todo');
const Counter = require('../models/Counter');
const { dateStringToDate } = require('../utils/dateUtils');
const { format } = require('date-fns');

async function getNextId(name = 'todoid') {
  const doc = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return doc.seq;
}

function formatTodoDoc(doc) {
  return {
    id: doc.id,
    todo: doc.todo,
    priority: doc.priority,
    category: doc.category,
    status: doc.status,
    dueDate: format(doc.dueDate, 'yyyy-MM-dd')
  };
}

async function getTodos(req, res) {
  const q = req.query || {};
  const filter = {};

  if (q.status) filter.status = q.status;
  if (q.priority) filter.priority = q.priority;
  if (q.category) filter.category = q.category;
  if (q.search_q) filter.todo = { $regex: q.search_q, $options: 'i' };

  const todos = await Todo.find(filter).sort({ id: 1 }).exec();
  return res.json(todos.map(formatTodoDoc));
}

async function getTodoById(req, res) {
  const id = Number(req.params.todoId);
  const todo = await Todo.findOne({ id }).exec();
  if (!todo) return res.status(404).send('Todo Not Found');
  return res.json(formatTodoDoc(todo));
}

async function getAgenda(req, res) {
  const dateString = req.query.date;
  const start = new Date(dateString + 'T00:00:00');
  const end = new Date(dateString + 'T23:59:59.999');

  const todos = await Todo.find({ dueDate: { $gte: start, $lte: end } }).sort({ id: 1 }).exec();
  return res.json(todos.map(formatTodoDoc));
}

async function createTodo(req, res) {
  const body = req.body;
  const dueDateObj = dateStringToDate(body.dueDate);

  let id;
  if (body.id !== undefined) {
    id = Number(body.id);
    const exists = await Todo.findOne({ id }).exec();
    if (exists) return res.status(400).send('Todo id already exists');
  } else {
    id = await getNextId();
  }

  const todo = new Todo({
    id,
    todo: body.todo,
    priority: body.priority,
    status: body.status,
    category: body.category,
    dueDate: dueDateObj
  });

  await todo.save();
  return res.send('Todo Successfully Added');
}

async function updateTodo(req, res) {
  const id = Number(req.params.todoId);
  const updates = req.body;

  const todo = await Todo.findOne({ id }).exec();
  if (!todo) return res.status(404).send('Todo Not Found');

  if (updates.status !== undefined) {
    todo.status = updates.status;
    await todo.save();
    return res.send('Status Updated');
  }

  if (updates.priority !== undefined) {
    todo.priority = updates.priority;
    await todo.save();
    return res.send('Priority Updated');
  }

  if (updates.todo !== undefined) {
    todo.todo = updates.todo;
    await todo.save();
    return res.send('Todo Updated');
  }

  if (updates.category !== undefined) {
    todo.category = updates.category;
    await todo.save();
    return res.send('Category Updated');
  }

  if (updates.dueDate !== undefined) {
    const dd = dateStringToDate(updates.dueDate);
    todo.dueDate = dd;
    await todo.save();
    return res.send('Due Date Updated');
  }

  return res.send('Updated');
}

async function deleteTodo(req, res) {
  const id = Number(req.params.todoId);
  const result = await Todo.deleteOne({ id }).exec();
  if (result.deletedCount === 0) return res.status(404).send('Todo Not Found');
  return res.send('Todo Deleted');
}

module.exports = {
  getTodos,
  getTodoById,
  getAgenda,
  createTodo,
  updateTodo,
  deleteTodo
};