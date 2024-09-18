import { useState, useEffect } from 'react';

const AddToDo = ({ addTodo, editingTodo, updateTodo }) => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setId(editingTodo.id);
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setCompleted(editingTodo.completed);
    }
  }, [editingTodo]);

  function handleSubmit(event) {
    event.preventDefault();
    if (id) {
      updateTodo({ id, title, description, completed });
    } else {
      addTodo({
        id: Date.now(),
        title,
        description,
        completed,
      });
    }
    resetForm();
  }

  function resetForm() {
    setId(null);
    setTitle('');
    setDescription('');
    setCompleted(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='shadow-md p-6 rounded-2xl bg-white'
    >
      <h1 className='text-3xl font-bold md:text-4xl md:leading-tight lg:leading-tight'>
        {id ? 'Edit Task' : 'Add Task'}
      </h1>
      <div className='mb-4 mt-8'>
        <label htmlFor='hs-hero-name-2' className='block text-sm font-medium'>
          <span className='sr-only'>Task name</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          id='hs-hero-name-2'
          className='py-3 px-4 block w-full bg-gray-100 border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
          placeholder='Enter task name'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='hs-hero-password-2'
          className='block text-sm font-medium'
        >
          <span className='sr-only'>task</span>
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type='text'
          className='py-3 px-4 block w-full h-20 bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
          placeholder='Enter your task'
        />
      </div>
      <div className='flex mb-4'>
        <input
          type='checkbox'
          id='completed'
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className='shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
        />
        <label
          htmlFor='completed'
          className='text-sm text-gray-500 ms-3 dark:text-neutral-400'
        >
          Mark as Completed
        </label>
      </div>
      <div className='grid'>
        <button
          type='submit'
          className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50'
        >
          {id ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
};

export default AddToDo;
