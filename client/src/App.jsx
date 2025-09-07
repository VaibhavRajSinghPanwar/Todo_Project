import React, { useEffect, useState } from "react";
import { Plus, Briefcase, Home, BookOpen, Calendar, Trash2, Circle, AlertTriangle, Clock } from "lucide-react";

const API = "http://localhost:3000";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: "",
    todo: "",
    category: "WORK",
    priority: "LOW",
    status: "TO DO",
    dueDate: "",
  });

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!newTodo.id || !newTodo.todo || !newTodo.dueDate) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await fetch(`${API}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      setNewTodo({
        id: "",
        todo: "",
        category: "WORK",
        priority: "LOW",
        status: "TO DO",
        dueDate: "",
      });
      fetchTodos();
    } catch (err) {
      alert("Error adding todo");
      console.error(err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "text-red-600 bg-red-50 border-red-200";
      case "MEDIUM":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "LOW":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "TO DO":
        return "text-slate-600 bg-slate-50 border-slate-200";
      case "IN PROGRESS":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "DONE":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "WORK":
        return <Briefcase className="w-5 h-5" />;
      case "HOME":
        return <Home className="w-5 h-5" />;
      case "LEARNING":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Circle className="w-5 h-5" />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "HIGH":
        return <AlertTriangle className="w-4 h-4" />;
      case "MEDIUM":
        return <Clock className="w-4 h-4" />;
      case "LOW":
        return <Circle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize and track your tasks efficiently
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Task
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Task ID
              </label>
              <input
                type="number"
                placeholder="Enter unique ID"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={newTodo.id}
                onChange={(e) => setNewTodo({ ...newTodo, id: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Task Description
              </label>
              <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={newTodo.todo}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, todo: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={newTodo.dueDate}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, dueDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={newTodo.category}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, category: e.target.value })
                }
              >
                <option>WORK</option>
                <option>HOME</option>
                <option>LEARNING</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={newTodo.priority}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, priority: e.target.value })
                }
              >
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={newTodo.status}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, status: e.target.value })
                }
              >
                <option>TO DO</option>
                <option>IN PROGRESS</option>
                <option>DONE</option>
              </select>
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            onClick={addTodo}
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <Circle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600">
                Create your first task to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {/* Task Header */}
                      <div className="flex items-center mb-3">
                        <div className="text-gray-600 mr-3">
                          {getCategoryIcon(t.category)}
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 flex-1">
                          {t.todo}
                        </h3>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${getPriorityColor(t.priority)}`}>
                          {getPriorityIcon(t.priority)}
                          {t.priority}
                        </div>
                      </div>

                      {/* Task Details */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {t.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                            t.status
                          )}`}
                        >
                          {t.status}
                        </span>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Due: {new Date(t.dueDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTodo(t.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete Task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Task Management System</p>
        </div>
      </div>
    </div>
  );
}

export default App;