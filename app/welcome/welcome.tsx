import { useState, useMemo } from "react";
import { say as cowsay } from "cowsay";
import { isFeatureEnabled } from "../utils/featureFlags";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export function Welcome() {
  // Generate a random user ID for demo purposes
  const userId = useMemo(() => `user-${Math.floor(Math.random() * 1000)}`, []);

  // Array of shorter funny cybersecurity phrases
  const securityPhrases = [
    "Password123? Really?",
    "Have you tried turning it off and on again?",
    "It's not a bug, it's a feature",
    "Don't click that link!",
    "My password is ********",
    "Hack the planet!",
    "Error 404: Security not found",
    "Keep calm and encrypt",
    "Trust no input",
    "Firewall is coming...",
    "I see your cookies",
    "sudo make me a sandwich",
    "Home is where the WiFi is",
    "Backup or regret it",
    "No place like 127.0.0.1"
  ];

  // Select a random phrase when component mounts
  const randomPhrase = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * securityPhrases.length);
    return securityPhrases[randomIndex];
  }, []);

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Cyber Security", completed: false },
    { id: 2, text: "Build a buisness", completed: false },
    { id: 3, text: "???", completed: false },
    { id: 4, text: "Profit", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0 max-w-md w-full px-4">
        <header className="flex flex-col items-center gap-4">
          <div className="w-[300px] max-w-[100vw] p-4">
            <pre className="text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-100 overflow-x-auto">
              {cowsay({text: randomPhrase})}
            </pre>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My SaaS service</h1>

          {/* Feature flag indicator section */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>User ID: {userId}</p>
            <p>
              Features enabled:
              {isFeatureEnabled('DARK_MODE') && ' Dark Mode,'}
              {isFeatureEnabled('ADVANCED_TODO_FILTERS') && ' Advanced Filters,'}
              {isFeatureEnabled('TODO_CATEGORIES') && ' Categories,'}
              {isFeatureEnabled('EXPORT_TODOS') && ' Export,'}
              {isFeatureEnabled('ANIMATED_COW') && ' Animated Cow'}
            </p>
          </div>
        </header>

        {/* Show export button if feature is enabled */}
        {isFeatureEnabled('EXPORT_TODOS') && (
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
          >
            Export Todos
          </button>
        )}

        <div className="w-full space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {todos.length === 0 ? (
                <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No todos yet. Add one above!
                </li>
              ) : (
                todos.map((todo) => (
                  <li key={todo.id} className="flex items-center p-4 group">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span
                      className={`ml-3 flex-1 ${
                        todo.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            All rights reserved, Cowsay.
          </p>
        </div>
      </div>
    </main>
  );
}

