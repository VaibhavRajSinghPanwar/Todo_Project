require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const todosRouter = require('./routes/todos');
const errorHandler = require('./middlewares/errorHandler');
const asyncHandler = require('./middlewares/asyncHandler');
const { validateQueryParams } = require('./middlewares/validate');
const { getAgenda } = require('./controllers/todoController');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect to database
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/todo_app');

// Routes
app.use('/todos', todosRouter);
app.get('/agenda', validateQueryParams, asyncHandler(getAgenda));
app.get('/', (req, res) => res.send('Todo API'));

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));