import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div class="flex items-center justify-center h-screen w-full bg-gray-100 px-6">
      <div class="h-min flex flex-col bg-white shadow-lg rounded-lg justify-center items-center text-gray-800 w-full lg:w-2/3 px-4 lg:px-0 lg:p-12 lg:mx-6 py-5">
        <div class="text-center">
          <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">
            Welcome to GiphyLake
          </h4>
        </div>
        <form>
          <p class="mb-4 text-sm">Please login to your account</p>
          <div class="mb-4">
            <input
              type="text"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <div class="text-center pt-1 mb-6 pb-1">
            <button
              class="inline-block px-6 py-2.5 text-black border-green-600 border font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:text-white hover:shadow-lg  transition duration-150 ease-in-out w-full mb-3 shadow-green-50"
              type="button"
            >
              Log in
            </button>
            <a class="text-gray-500 text-sm" href="#!">
              Forgot password?
            </a>
          </div>
          <div class="flex items-center justify-between pb-6 text-sm">
            <p class="mb-0 mr-2">Don't have an account?</p>
            <Link
              to="/register"
              class="px-6 py-2 border-2 border-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
