# Todo Application Backend
A robust Node.js + Express + MongoDB backend for a Todo management application with full CRUD operations, filtering, and agenda features.

# Features
✅ Create, read, update, and delete todos

✅ Filter todos by status, priority, category, and search text

✅ Agenda view for todos due on a specific date

✅ Auto-incrementing todo IDs with optional custom IDs

✅ Input validation and error handling

✅ CORS enabled for frontend integration

✅ Security headers with Helmet.js

# Technologies Used
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM for MongoDB

date-fns - Date manipulation

Helmet.js - Security headers

CORS - Cross-origin resource sharing

# Project Structure
text
todo-backend/
├─ src/
│  ├─ app.js                 # Main application file
│  ├─ config/
│  │  └─ db.js              # Database connection
│  ├─ models/
│  │  ├─ Todo.js            # Todo model
│  │  └─ Counter.js         # Counter for auto-increment IDs
│  ├─ routes/
│  │  └─ todos.js           # Todo routes
│  ├─ controllers/
│  │  └─ todoController.js  # Business logic
│  ├─ middlewares/
│  │  ├─ asyncHandler.js    # Async error handling
│  │  ├─ validate.js        # Input validation
│  │  └─ errorHandler.js    # Error handling
│  └─ utils/
│     └─ dateUtils.js       # Date utilities
├─ .env                     # Environment variables
├─ package.json             # Dependencies and scripts
└─ README.md               # This file

# Setup Instructions
Prerequisites
Node.js (v14 or higher)

MongoDB (local installation or MongoDB Atlas account)

npm or yarn

# Installation
Clone the repository:

bash
git clone <repository-url>
cd todo-backend
Install dependencies:

bash
npm install
Set up environment variables:

bash
cp .env.example .env
Edit the .env file with your MongoDB connection string:

text
MONGO_URI=mongodb://localhost:27017/todo_app
PORT=3000
Start MongoDB (if using local installation):

macOS: brew services start mongodb-community

Windows: Start MongoDB Service from Services panel

Ubuntu: sudo service mongod start

Run the application:

bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
The server will start on http://localhost:3000

API Documentation
Base URL
text
http://localhost:3000
Endpoints
Get All Todos
text
GET /todos
Optional query parameters:

status - Filter by status (TO DO, IN PROGRESS, DONE)

priority - Filter by priority (HIGH, MEDIUM, LOW)

category - Filter by category (WORK, HOME, LEARNING)

search_q - Search in todo text

Get Todo by ID
text
GET /todos/:id
Create Todo
text
POST /todos
Request body:

json
{
  "todo": "Task description",
  "category": "WORK",
  "priority": "HIGH",
  "status": "TO DO",
  "dueDate": "2023-12-15"
}
Update Todo
text
PUT /todos/:id
Request body (update one field at a time):

json
{
  "status": "IN PROGRESS"
}
Delete Todo
text
DELETE /todos/:id
Get Agenda
text
GET /agenda?date=2023-12-15
Returns all todos due on the specified date.

Todo Properties
id: Number (auto-incremented or custom)

todo: String (required)

category: String (WORK, HOME, LEARNING)

priority: String (HIGH, MEDIUM, LOW)

status: String (TO DO, IN PROGRESS, DONE)

dueDate: Date (YYYY-MM-DD format)

Testing with Postman
Import the provided Postman collection

Set the baseUrl variable to http://localhost:3000

Run requests in sequence for best results

The collection includes:

All CRUD operations

Filtering examples

Error case testing

Troubleshooting
MongoDB Connection Issues
Ensure MongoDB is running:

bash
# Check MongoDB status
mongosh
If using MongoDB Atlas, update the connection string in .env:

text
MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/todo_app
For SSL issues, modify src/config/db.js:

js
await mongoose.connect(uri, {
  ssl: false,
  sslValidate: false
});
Port Already in Use
Change the PORT value in .env if port 3000 is occupied.

Contributing
Fork the repository

Create a feature branch

Make your changes

Add tests if applicable

Submit a pull request

License
This project is licensed under the MIT License.
