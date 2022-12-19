import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword, resetPassword } from '../firebase';
import LoadingSpinner from '../components/LoadingSpinner';


const Login = () => {
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
    });
    const formOptions = { resolver: yupResolver(formSchema) };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(formOptions);


    const onSubmit = async ({ email, password }) => {


        const res = await resetPassword(email, password);
        if (res) {
            navigate('/login')
        }
    };

    return (
        loading ?
            <LoadingSpinner /> :
            <div className="flex items-center justify-center h-screen w-full bg-gray-100 px-6">
                <div className="h-min flex flex-col bg-white shadow-lg rounded-lg justify-center items-center text-gray-800 w-full lg:w-2/3 px-4 lg:px-0 lg:p-12 lg:mx-6 py-5">
                    <div className="text-center">
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                            Reset Password
                        </h4>
                    </div>
                    <form className="text-xs md:w-1/2 w-full px-4" onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="text-center pt-1 mb-6 pb-1">
                            <button
                                className="inline-block px-6 py-2.5 text-black border-green-600 border font-medium text-xs leading-tight uppercase rounded shadow-md bg-green-100 hover:bg-green-700 hover:text-white hover:shadow-lg  transition duration-150 ease-in-out w-full mb-3 shadow-green-50"
                                type="submit"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Login;
