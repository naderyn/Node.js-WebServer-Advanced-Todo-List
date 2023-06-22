const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

let todoData = [];
let currentId = 1;

app.use(express.json());

const dataFilePath = 'todo.json';

// Load data from file on server start
fs.readFile(dataFilePath, (err, data) => {
  if (err) {
    console.error('Error reading data file:', err);
  } else {
    try {
      todoData = JSON.parse(data.toString());
      currentId = Math.max(...todoData.map((item) => item.id)) + 1;
      console.log('Data loaded successfully.');
    } catch (err) {
      console.error('Error parsing data:', err);
    }
  }
});

// Function to save the data to a file
function saveData() {
  fs.writeFile(dataFilePath, JSON.stringify(todoData, null, 2), (err) => {
    if (err) {
      console.error('Error writing data file:', err);
    } else {
      console.log('Data saved successfully.');
    }
  });
}

// Add a todo item
app.post('/todos', (req, res) => {
  const { name, status = 'todo', priority = 'low', time } = req.body;

  const todoItem = {
    id: currentId++,
    name,
    status,
    priority,
    time,
  };

  todoData.push(todoItem);
  saveData();

  res.json(todoItem);
});

// List todo items based on filters
app.get('/todos', (req, res) => {
  const { name, status, priority } = req.query;

  let filteredTodos = [...todoData];

  if (name) {
    filteredTodos = filteredTodos.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (status) {
    filteredTodos = filteredTodos.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  }
  if (priority) {
    filteredTodos = filteredTodos.filter(
      (item) => item.priority.toLowerCase() === priority.toLowerCase()
    );
  }

  res.json(filteredTodos);
});

// Update a todo item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { name, status, priority, time } = req.body;

  const index = todoData.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    const todoItem = todoData[index];

    if (name) todoItem.name = name;
    if (status) todoItem.status = status;
    if (priority) todoItem.priority = priority;
    if (time) todoItem.time = time;

    saveData();
    res.json(todoItem);
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

// Delete a todo item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  const index = todoData.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    const deletedItem = todoData.splice(index, 1)[0];

    // Update IDs of the remaining items
    todoData.forEach((item, i) => {
      item.id = i + 1;
    });

    saveData();

    res.json(deletedItem);
  } else {
    res.status(404).json({ message: 'Todo item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
