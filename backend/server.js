const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE = './tasks.json';


const readTasks = () => {
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
};


app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


app.post('/tasks', (req, res) => {
  const tasks = readTasks();

  const newTask = req.body;

  tasks.push(newTask);

  writeTasks(tasks);

  res.json(newTask);
});


app.delete('/tasks/:id', (req, res) => {
  let tasks = readTasks();

  const { id } = req.params;

  tasks = tasks.filter(t => t.id !== id);

  writeTasks(tasks);

  res.json({ message: 'Deleted' });
});


app.patch('/tasks/:id', (req, res) => {
  let tasks = readTasks();

  const { id } = req.params;

  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );

  writeTasks(tasks);

  res.json({ message: 'Toggled' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});