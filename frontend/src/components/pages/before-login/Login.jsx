import { Link, useNavigate } from 'react-router-dom';
import LoginTodo from '../../../assets/images/todo.png';
import { useForm } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../api/reducers/AuthSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors: loginErrors },
  } = useForm();
  const onLoginSubmit = async (data) => {
    const result = await dispatch(login(data));
    if (!result.error) {
      navigate('/tasks');
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/login"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-16 h-16 mr-2" src={LoginTodo} alt="logo" />
            Task Management
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {error ? (
                <div className="my-2 p-2 w-full bg-red-500 text-white rounded-md text-center">
                  {Array.isArray(error) && error.length ? (
                    <ul>
                      {error.map((err, i) => {
                        return (
                          <li key={nanoid + 'err_' + i}>
                            {err.message.charAt(0).toUpperCase() +
                              err.message.slice(1)}
                          </li>
                        );
                      })}
                    </ul>
                  ) : error?.message ? (
                    error.message
                  ) : (
                    error
                  )}
                </div>
              ) : null}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onLoginSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    autoComplete="off"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {loginErrors?.email && loginErrors?.email?.message && (
                    <span className="text-red-500 text-sm mt-1">
                      {loginErrors?.email?.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  {loginErrors?.password && loginErrors?.password?.message && (
                    <span className="text-red-500 text-sm mt-1">
                      {loginErrors?.password?.message}
                    </span>
                  )}
                </div>

                {loading ? (
                  <button
                    disabled
                    type="button"
                    className="w-full flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 rounded-lg px-5 py-2.5 mr-2 dark:bg-blue-600 cursor-not-allowed"
                  >
                    <BiLoaderCircle className="animate-spin" />
                    &nbsp;&nbsp;Sign In
                  </button>
                ) : (
                  <input
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 cursor-pointer"
                    value="Sign In"
                  />
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?&nbsp;&nbsp;
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
