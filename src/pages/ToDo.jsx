import { useState, useEffect } from 'react';
import AddTodo from '../components/AddToDo';
import TodoCard from '../components/TodoCard';

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodosToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const updateTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return (
    <section className='relative overflow-hidden bg-slate-100 min-h-screen'>
      <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 max-w-3xl mx-auto'>
          <AddTodo
            addTodo={addTodo}
            editingTodo={editingTodo}
            updateTodo={updateTodo}
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Message when no todos */}
        {todos.length === 0 && (
          <p className='text-center text-gray-500 mt-8'>
            No todos yet. Add a new todo to get started!
          </p>
        )}
      </div>
    </section>
  );
};

export default ToDo;
