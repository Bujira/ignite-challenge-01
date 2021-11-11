const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function cehckUserExists(request, response, next) {
  const { username } = request.headers;

  const userExists = users.find((user) => user.username === username);

  if (!userExists) {
    return response.status(400).json({ error: "User not found!" });
  }

  request.user = userExists;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const newUser = {
    id: uuid(),
    name,
    username,
    todos: []
  }

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get('/todos', cehckUserExists, (request, response) => {
  const { user } = request;

  return response.status(200).json(user.todos);
});

app.post('/todos', cehckUserExists, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const newToDo = {
    id: uuid(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(newToDo);

  return response.status(201).json(newToDo);
});

app.put('/todos/:id', cehckUserExists, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const todo = user.todos.find((todo) => todo.id === id);

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).json(todo);
});

app.patch('/todos/:id/done', cehckUserExists, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find((todo) => todo.id === id);

  todo.done = true;

  return response.status(200).json(todo);
});

app.delete('/todos/:id', cehckUserExists, (request, response) => {
  // Complete aqui
});

module.exports = app;