"use client";
import { useEffect, useState } from "react";
import { Badge, BadgeCheck } from "lucide-react";

// interface
interface TodoItem {
  id: number;
  text: string;
  Check: boolean;
}

const Todolist: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [checkTodo, setCheckTodo] = useState<boolean>(false);

  // useEffect hook to fetch todos form localStorage
  useEffect(() => {
    const storedTodoList = localStorage.getItem("todos");
    if (storedTodoList) {
      setTodos(JSON.parse(storedTodoList));
    }
  }, []);

  // Function to handle button click
  const handleButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the value of the input field and trim any leading/trailing whitespace
    const newItemText = (
      document.getElementById("mylist") as HTMLInputElement
    )?.value?.trim();

    // Check if the new item text is empty and return
    if (!newItemText) {
      return;
    }

    // Create a new item with a unique ID and text
    const newTodo: TodoItem = {
      id: Date.now(),
      text: newItemText,
      Check: false,
    };

    const updatedTodos = [...todos, newTodo];

    // Update the state with the new todos list
    setTodos(updatedTodos);

    // Store the updated todos list in localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // Reset the form to clear the input field
    (event.target as HTMLFormElement).reset();
  };

  // Fuction handle deleting
  const handleDeleteTodo = (id: number) => {
    // Filter the todos array to exclude the item with the matching ID
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    // Update the state with the filtered todos list
    setTodos(updatedTodos);

    // Update localStorage with the removed item
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Function Edit todo list
  const handleEditTodo = ({ id, text }: TodoItem) => {
    setEditingId(id);
    setEditedText(text);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedText(todoToEdit.text);
    }
  };

  // Handle seving the edited todo
  const handleSaveEdit = () => {
    if (editedText.trim()) {
      // Update todo with the edited text for the matching ID
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editedText } : todo
      );

      // Update the state with the modified
      setTodos(updatedTodos);

      // Store Update todo list in the LocalSotrage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      // Reset the state variables
      setEditingId(null);
      setEditedText("");
    }
  };

  // Function handle Check
  const handleCheck = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, Check: !todo.Check } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="bg-white rounded-lg mx-auto max-w-screen-xl px-2.5 pt-16">
      <div className="flex flex-col items-center ">
        <div className="text-5xl items-center ">To Do List</div>
        <form
          className="flex justify-between w-full md:w-2/3 pt-10 "
          onSubmit={handleButtonClick}
        >
          <input
            type="text"
            name="mylist"
            id="mylist"
            className="bg-black text-white pl-2 rounded-md md:text-2xl w-2/3 "
            placeholder="Add To Do List"
          />
          <button
            className="bg-white px-5 rounded-md border-black border-2 text-2xl"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="w-full mt-5 px-5  rounded-md border-black border-4 overflow-y-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="grid grid-cols-[2rem_1fr_100px_100px] items-center py-2"
            >
              <div
                onClick={() => handleCheck(todo.id)}
                className="cursor-pointer"
              >
                {todo.Check ? (
                  <BadgeCheck className="text-green-500" />
                ) : (
                  <Badge className="text-red-400" />
                )}
              </div>

              <div
                className={`text-center inline-block cursor-default md:text-2xl sm:text-3xl ${
                  todo.Check ? "line-through" : ""
                }`}
              >
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="bg-gray-800 text-white pl-2 rounded-md md:text-2xl w-2/3 "
                  />
                ) : (
                  todo.text
                )}
              </div>
              {editingId === todo.id ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEditTodo(todo)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Edit
                </button>
              )}
              {!editingId && (
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todolist;
