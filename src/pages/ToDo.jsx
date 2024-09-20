import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AddTodo from '../components/AddToDo';
import TodoCard from '../components/TodoCard';

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

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

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-slate-100'>
      <header className='bg-slate-100 text-blue-600 py-2 border-b border-slate-200'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>My ToDo App</h1>
          <button
            onClick={handleLogout}
            className='bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors'
          >
            Logout
          </button>
        </div>
      </header>
      <section className='relative overflow-hidden'>
        <div className='mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 max-w-3xl mx-auto'>
            <AddTodo
              addTodo={addTodo}
              editingTodo={editingTodo}
              updateTodo={updateTodo}
            />
          </div>

          <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12
          '
          >
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
    </div>
  );
};

export default ToDo;
