import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please check email')
      .required('Please enter correct email'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(6, 'Password must be at 6 char long'),
    cpassword: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div class="flex items-center justify-center h-screen w-full bg-gray-100 px-6">
      <div class="h-min flex flex-col bg-white shadow-lg rounded-lg justify-center items-center text-gray-800 w-full lg:w-2/3 px-4 lg:px-0 lg:p-12 lg:mx-6 py-5">
        <div class="text-center">
          <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">
            Welcome to GiphyLake
          </h4>
        </div>
        <form className="text-xs" onSubmit={handleSubmit(onSubmit)}>
          <p class="mb-4">Fill this form to create your account</p>
          <div class="mb-4">
            <input
              {...register('email')}
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              placeholder="Email"
            />

            {errors.email && (
              <p className="text-xs text-red-700 pt-1">Please check Email</p>
            )}
          </div>
          <div class="mb-4">
            <input
              {...register('password')}
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              placeholder="Password"
            />

            {errors.password && (
              <p className="text-xs text-red-700 pt-1">Please check Email</p>
            )}
          </div>
          <div class="mb-4">
            <input
              {...register('cpassword')}
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              placeholder="Confirm Password"
            />
            {errors.cpassword && (
              <p className="text-xs text-red-700 pt-1">
                Please check Confirm Password
              </p>
            )}
          </div>
          <div class="text-center pt-1 mb-6 pb-1">
            <button
              class="inline-block px-6 py-2.5 text-black border-green-600 border font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg  transition duration-150 ease-in-out w-full mb-3 shadow-green-50"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div class="flex items-center justify-between pb-6">
            <p class="mb-0 mr-2">Already have an account?</p>
            <Link
              to="/login"
              class="px-6 py-2 border-2 border-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
