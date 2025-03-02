import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { get } from "https";

const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);

const dataFolder = path.join(__dirname, "data");
const tasksFile = path.join(dataFolder, "tasks.json"); // Path to the Database

// Function to ensure the file and folder exist
function ensureDataFile() {
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder); // Create "data" folder if missing
  }
  if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, "[]", "utf-8"); // Create "tasks.json" with an empty array
  }
}

// Read all tasks
function readAllTasks() {
  ensureDataFile(); // Ensure file exists before reading
  const tasks = fs.readFileSync(tasksFile, "utf-8");
  return JSON.parse(tasks);
}

// Create a new task
function createTask(title, description) {
  const tasks = readAllTasks();

  const newTask = {
    id: uuidv4(),
    owner: `${uuidv4()}@mail.com`,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Update a task
function updateTask(id, title, description) {
  const tasks = readAllTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex < 0) {
    throw new Error(`Task with ${id} not found.`);
  }

  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;

  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Delete a task
function deleteTask(id) {
  const tasks = readAllTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  fs.writeFileSync(tasksFile, JSON.stringify(filteredTasks, null, 2));
}

// BONUS HOMEWORK

function markTaskAsCompleted(id) {
  const tasks = readAllTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex < 0) {
    throw new Error(`Task with ${id} not found.`);
  }

  tasks[taskIndex].completed = true;

  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

function getTasksByOwner(ownerEmail) {
  const tasks = readAllTasks();

  const tasksByOwner = tasks.filter((task) => task.owner === ownerEmail);

  return tasksByOwner;
}

function deleteAll() {
  fs.writeFileSync(tasksFile, JSON.stringify([], null, 2));
}

markTaskAsCompleted("dcc6edc1-9717-43c0-a333-7e116f3ed7fa");

console.log(getTasksByOwner("eccb5dea-7a9d-4800-8639-bc82ec690cfd@mail.com"));

// deleteAll();
