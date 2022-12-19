import React from 'react';

import spinner from '../assets/spinner.png'

const LoadingSpinner = () => {
    return (
        <>
            <div className="flex justify-center items-center w-full h-screen">
                <img className='animate-spin' src={spinner} width={50} height={50} />
            </div>
        </>
    )
}

export default LoadingSpinner;