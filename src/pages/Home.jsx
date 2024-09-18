import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, SetPassword] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  function login(e) {
    e.preventDefault();
    const isCorrectUsername = username === 'domi@gmail.com';
    const isCorrectPassword = password === '123456';
    if (isCorrectPassword && isCorrectUsername) {
      authContext.setToken('1234');
      navigate('/todo');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  return (
    <section className='relative overflow-hidden'>
      <div className='mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8'>
        <div className='md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12'>
          {/* Title */}
          <h1 className='text-3xl font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight'>
            Organise your life{' '}
            <span className='text-blue-600 dark:text-blue-500'>team</span>
          </h1>
          <p className='mt-3 text-base text-gray'>
            Organize your work and lifeStyle with My ToDo
          </p>
          {/* End Title */}

          {/* Form */}
          <form>
            <div className='mb-4 mt-8'>
              <label
                htmlFor='hs-hero-name-2'
                className='block text-sm font-medium'
              >
                <span className='sr-only'>User Name</span>
              </label>
              <input
                type='email'
                id='hs-hero-name-2'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='py-3 px-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                placeholder='User Name'
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='hs-hero-password-2'
                className='block text-sm font-medium'
              >
                <span className='sr-only'>Password</span>
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                className='py-3 px-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                placeholder='Password'
              />
            </div>
            <div className='grid'>
              <button
                type='submit'
                className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 '
                onClick={login}
              >
                Login
              </button>
            </div>
          </form>
          {/* End Form */}
        </div>
      </div>
      <div className="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')] bg-no-repeat bg-center bg-cover" />
      {/* End Col */}
    </section>
  );
};

export default Home;
