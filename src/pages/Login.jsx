import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import GoogleLoginButton from '../components/GoogleLoginButton';


const Login = () => {
  const [err, setErr] = useState(null) //to set and show err in custom scenario
  const [user, loading, error] = useAuthState(auth); //using useAuthState hook to check user state
  const navigate = useNavigate();

  useEffect(() => {
    //redirect the user if already logged in, user state is dependency
    if (user) {
      navigate('/');
    }
  }, [user])

  //Yup schema for input validation
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please check email')
      .required('Please enter correct email'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(6, 'Password must be at 6 char long')
  });

  //passing schema to react-hook-form
  const formOptions = { resolver: yupResolver(formSchema) };

  //initializing form helpers from react-hook-form using useForm
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

              <div className="text-center pt-1">
                <button
                  className="inline-block px-6 py-2.5 text-black border-green-600 border font-medium text-xs leading-tight uppercase rounded shadow-md bg-green-100 hover:bg-green-700 hover:text-white hover:shadow-lg  transition duration-150 ease-in-out w-full mb-3 shadow-green-50"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className='text-center mb-3'><Link to="/reset-password">Forgot Password?</Link></div>
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
              <GoogleLoginButton />
            </form>
          </div>
        </div>)
  );
};

export default Login;
