const mongoose = require('mongoose');


const VALID_PRIORITIES = ['HIGH', 'MEDIUM', 'LOW'];
const VALID_STATUSES = ['TO DO', 'IN PROGRESS', 'DONE'];
const VALID_CATEGORIES = ['WORK', 'HOME', 'LEARNING'];


const TodoSchema = new mongoose.Schema({
id: { type: Number, required: true, unique: true },
todo: { type: String, required: true },
category: { type: String, enum: VALID_CATEGORIES, required: true },
priority: { type: String, enum: VALID_PRIORITIES, required: true },
status: { type: String, enum: VALID_STATUSES, required: true },
dueDate: { type: Date, required: true }
});


module.exports = mongoose.model('Todo', TodoSchema);
module.exports.VALID_PRIORITIES = VALID_PRIORITIES;
module.exports.VALID_STATUSES = VALID_STATUSES;
module.exports.VALID_CATEGORIES = VALID_CATEGORIES;