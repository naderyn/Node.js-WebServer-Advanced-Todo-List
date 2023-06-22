const fs = require('fs');
const { Command } = require('commander');

const dataFilePath = 'todo.json';

let todoData = [];
if (fs.existsSync(dataFilePath)) {
  const data = fs.readFileSync(dataFilePath);
  todoData = JSON.parse(data);
}

// Function to save the data
function saveData() {
  fs.writeFileSync(dataFilePath, JSON.stringify(todoData, null, '\t'));
}

const program = new Command();

// Define the CLI commands
program
  .command('add <title>')
  .description('Add a new entry')
  .action((title) => {
    const entry = {
      id: generateId(),
      title,
      status: 'to-do',
    };
    todoData.push(entry);
    saveData();
    console.log('Entry added successfully.');
  });

program
  .command('list [status]')
  .description('List all entries or filter by status')
  .action((status) => {
    if (status) {
      const filteredEntries = todoData.filter(entry => entry.status === status);
      filteredEntries.forEach(entry => console.log(`ID: ${entry.id}, Title: ${entry.title}, Status: ${entry.status}`));
    } else {
      todoData.forEach(entry => console.log(`ID: ${entry.id}, Title: ${entry.title}, Status: ${entry.status}`));
    }
  });

program
  .command('edit <id>')
  .description('Edit an existing entry by ID')
  .option('-t, --title <newTitle>', 'Edit the title of the entry')
  .option('-s, --status <newStatus>', 'Edit the status of the entry')
  .action((id, options) => {
    const entry = todoData.find(entry => entry.id === Number(id));
    if (entry) {
      if (options.title) {
        entry.title = options.title;
      }
      if (options.status) {
        entry.status = options.status;
      }
      saveData();
      console.log('Entry edited successfully.');
    } else {
      console.log('Entry not found.');
    }
  });

program
  .command('delete <id>')
  .description('Delete an entry by ID')
  .action((id) => {
    const index = todoData.findIndex(entry => entry.id === Number(id));
    if (index !== -1) {
      todoData.splice(index, 1);
      saveData();
      console.log('Entry deleted successfully.');
    } else {
      console.log('Entry not found.');
    }
  });

// Function to generate a new ID for new entries
function generateId() {
  const maxId = todoData.reduce((max, entry) => (entry.id > max ? entry.id : max), 0);
  return maxId + 1;
}

// Parse the command-line arguments
program.parse(process.argv);
