const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function cehckUserExists(request, response, next) {
  // Complete aqui
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

app.get('/todos', (request, response) => {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  return response.status(200).json(user.todos);
});

app.post('/todos', cehckUserExists, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', cehckUserExists, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', cehckUserExists, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', cehckUserExists, (request, response) => {
  // Complete aqui
});

module.exports = app;