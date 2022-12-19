import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../firebase';
import spinner from '../assets/spinner.png'
import LoadingSpinner from '../components/LoadingSpinner';


const Login = () => {
  const [err, setErr] = useState(null)
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user])

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please check email')
      .required('Please enter correct email'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(6, 'Password must be at 6 char long')
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  //Submiting the form after successfull validation
  const onSubmit = async ({ email, password }) => {
    const res = await logInWithEmailAndPassword(email, password);
    if (res) {

      navigate('/');
    } else {
      setErr('Unable to login, please make sure credentials are correct.')
    }
  };

  return (
    loading ?
      <LoadingSpinner /> : (
        <div className="flex items-center justify-center h-screen w-full bg-gray-100 px-6">
          <div className="h-min flex flex-col bg-white shadow-lg rounded-lg justify-center items-center text-gray-800 w-full lg:w-2/3 px-4 lg:px-0 lg:p-12 lg:mx-6 py-5">
            <div className="text-center">
              <h4 className="text-xl font-semibold mt-1 mb-2 pb-1">
                Welcome to GiphyLake
              </h4>
            </div>
            <form className="text-xs md:w-1/2 w-full px-4" onSubmit={handleSubmit(onSubmit)}>
              {error && <p>{error}</p>}
              {err && <p className='text-center py-2 pb-4 text-red-500'>{err}</p>}
              <div className="mb-4">
                <input
                  {...register('email')}
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  placeholder="Email"
                />

                {errors.email && (
                  <p className="text-xs text-red-700 pt-1">Please check Email</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  {...register('password')}
                  type="password"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  placeholder="Password"
                />

                {errors.password && (
                  <p className="text-xs text-red-700 pt-1">Please check password</p>
                )}
              </div>

              <div className="text-center pt-1 mb-6 pb-1">
                <button
                  className="inline-block px-6 py-2.5 text-black border-green-600 border font-medium text-xs leading-tight uppercase rounded shadow-md bg-green-100 hover:bg-green-700 hover:text-white hover:shadow-lg  transition duration-150 ease-in-out w-full mb-3 shadow-green-50"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-between pb-6 gap-5">
                <p className="mb-0 mr-2 whitespace-nowrap">Don't have an account?</p>
                <Link
                  to="/register"
                  className="w-full text-center px-6 py-2 border-2 border-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Create Account
                </Link>
              </div>
              <div className="flex justify-between items-center">

                <hr className="w-full" />
                <span className="p-2 text-gray-400 mb-1">OR</span>
                <hr className="w-full" />

              </div>
              <div className='w-full bg-white border-2 flex items-center justify-center border-black rounded p-2 gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                Sign In with Google</div>
            </form>
          </div>
        </div>)
  );
};

export default Login;
