import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {

  const [userdata, setUserdata] = useState([])
  const [index, setindex] = useState(1)

  const data = async () => {
    const pics = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`);
    console.log(pics.data);
    setUserdata(pics.data);
  }

  useEffect(function(){
    data()
  },[index])

  let printuserdata = <h3 className='text-xs text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</h3>
  if(userdata.length>0){
    printuserdata = userdata.map(function(elem,idx){
      return <a href={elem.download_url}>
        <div>
        <div className='h-40 w-44 bg-white rounded-xl'>
        <img className='h-full object-cover' src={elem.download_url} alt='' />
      </div>
      <h2 className='font-bold'>{elem.author}</h2>
      </div>
      </a>
    })
  }

  return (
    <>
    <h1 className='items-center justify-center text-center px-4 py-4 bg-gradient-to-br from-pink-400 to-purple-600 text-2xl font-bold'>Gallery</h1>
      <div className='flex flex-wrap gap-3 m-2'>
        {printuserdata}
      </div>
      <div className='items-center justify-center flex gap-2'>
        <button 
        onClick={() => {
          setindex(index-1)
          setUserdata([])
        }
        }
        className='active:scale-90 bg-green-500 text-black px-6 py-2 rounded'
        >Prev</button>
        <button 
        onClick={() => {
          setindex(index+1)
          setUserdata([])
        }
        }
        className='active:scale-90 bg-green-500 text-black px-6 py-2 rounded'
        >Next</button>
      </div>
    </>
  )
}

export default App