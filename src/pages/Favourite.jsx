import React, { useState, useEffect } from 'react';
import { getAllMyFavGifs, removeGiphyFromMyFav } from '../firebase'

import { CiCircleRemove } from 'react-icons/ci'
import MainLayout from '../layouts/MainLayout';

const Favourite = () => {
  const [giphies, setMyFavGifs] = useState(null);

  //function to get all Favourit gifs
  const handleGetAllFavGifs = async () => {
    await getAllMyFavGifs(setMyFavGifs);
  }

  //function to remove gif from myfav collection using firestore doc ref
  const handleRemoveFromFav = (id) => {
    console.log(id)
    removeGiphyFromMyFav(id);
    handleGetAllFavGifs()
  }

  //for initial fetch
  useEffect(() => {
    handleGetAllFavGifs();
  }, [])


  return (
    <MainLayout>
      <div className='bg-white-100 w-full pt-20 text-sm  min-h-screen h-full flex flex-col items-center'>

        {
          giphies?.length > 0 ? (
            <div className='px-20 grid grid-cols-1 md:grid-cols-3 gap-5'>
              {giphies.map((giphy, key) => (
                <div key={key} className="w-full shadow-lg rounded-md border flex flex-col">
                  <img src={giphy.image} className='rounded-t-md w-full h-56' />
                  <div className='w-full flex justify-between px-5 pt-5'>
                    <div className='font-bold text-lg'>{giphy.gid}</div>
                    <div onClick={() => handleRemoveFromFav(giphy.refId)} className='text-yellow-500 pl-3'><CiCircleRemove size={25} /></div>
                  </div>
                  <div className='text-start px-5 pb-5 text-gray-500'>@{giphy.guser}</div>
                </div>
              ))}
            </div>
          ) : <div className='w-full h-80 flex justify-center text-center'>You have not marked any GIF as your favourite...</div>
        }
      </div>
    </MainLayout>)
};

export default Favourite;
