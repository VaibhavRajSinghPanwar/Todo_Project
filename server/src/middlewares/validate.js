const { normalizeDateString } = require("../utils/dateUtils");
const {
  VALID_PRIORITIES,
  VALID_STATUSES,
  VALID_CATEGORIES,
} = require("../models/Todo");
function validateTodoFieldsFromBody(req, res, next) {
  const body = req.body || {};

  if (body.status !== undefined) {
    const val = String(body.status).toUpperCase();
    if (!VALID_STATUSES.includes(val))
      return res.status(400).send("Invalid Todo Status");
    body.status = val;
  }

  if (body.priority !== undefined) {
    const val = String(body.priority).toUpperCase();
    if (!VALID_PRIORITIES.includes(val))
      return res.status(400).send("Invalid Todo Priority");
    body.priority = val;
  }

  if (body.category !== undefined) {
    const val = String(body.category).toUpperCase();
    if (!VALID_CATEGORIES.includes(val))
      return res.status(400).send("Invalid Todo Category");
    body.category = val;
  }

  if (body.dueDate !== undefined) {
    const normalized = normalizeDateString(String(body.dueDate));
    if (!normalized) return res.status(400).send("Invalid Due Date");
    body.dueDate = normalized; // keep as yyyy-MM-dd string for controller to convert
  }

  req.body = body;
  next();
}

function validateQueryParams(req, res, next) {
  const q = req.query || {};

  if (q.status !== undefined) {
    if (!VALID_STATUSES.includes(String(q.status).toUpperCase()))
      return res.status(400).send("Invalid Todo Status");
    q.status = String(q.status).toUpperCase();
  }

  if (q.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(String(q.priority).toUpperCase()))
      return res.status(400).send("Invalid Todo Priority");
    q.priority = String(q.priority).toUpperCase();
  }

  if (q.category !== undefined) {
    if (!VALID_CATEGORIES.includes(String(q.category).toUpperCase()))
      return res.status(400).send("Invalid Todo Category");
    q.category = String(q.category).toUpperCase();
  }

  if (q.date !== undefined) {
    const normalized = normalizeDateString(String(q.date));
    if (!normalized) return res.status(400).send("Invalid Due Date");
    q.date = normalized;
  }

  req.query = q;
  next();
}

module.exports = { validateTodoFieldsFromBody, validateQueryParams };
