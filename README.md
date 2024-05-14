# Todo List Application

## Version: 1.0.0 (Beta)

A simple todo list application built with React.

## Features

- Add new todo items
- Edit existing todo items
- Mark todo items as completed
- Delete todo items
- Store todo list in local storage for persistence

## Usage

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Install dependencies:

   ```bash
   npm install

3. Run the development server
   
   ```bash
   npm run dev

5. Access the application in your browser at http://localhost:3000.
   
## Technologies Used

- React.js
- Lucide Icons
- Tailwind CSS

## Application Structure

- `Todolist`: The main component that manages the todo list functionality.
- `TodoItem`: Represents an individual todo item in the list.

## How It Works
- The Todolist component manages the state of the todo list, including adding, editing, deleting, and marking items as completed.
- Todo items are stored in local storage to maintain their state across page refreshes.
- Each todo item can be edited by clicking the "Edit" button, and changes are saved by clicking the "Save" button.
- Todo items can be marked as completed by clicking the checkbox next to them.
- Completed todo items are visually distinguished by a line-through effect.

## License
This project is licensed under the MIT License 
