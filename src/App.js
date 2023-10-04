import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import Weatherbody from './component/Weatherbody'
import axios from 'axios'
import PuffLoader from "react-spinners/PuffLoader";
import { message } from 'antd';


const App = () => {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('kolkata')
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
 
  const date = new Date();

  // Find Time
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var meridiem = 'AM'

  if (hours === 0) {
    hours = 12;
  }

  if (hours > 12) {
    hours = hours - 12;
    meridiem = "PM";
  }

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  // Find Date 
  // date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })   //output : 'Jul 19, 2023'
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = monthName[date.getMonth()];
  const year = date.getFullYear();

  // Find day name
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]

  const fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1ab95fb1f19a951b062345531da0a021&units=metric`
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=366700daae9a8a20d72109f71a9e007f&units=metric`

    // console.log(res.data)
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      message.error('Please enter a valid location')
    }
  }
  console.log(data);

  useEffect(() => {
    fetchApi();
  }, [location])

  const handleKeyDown = event => {
    // console.log('User pressed: ', event.key);
    if (event.key === 'Enter') {
      // console.log('Enter key pressed ✅')
      setLocation(search);
      setSearch('');
    }
  }
  // console.log(location)

  return (
    <>{
      loading ?
        <div className=" w-full h-screen flex justify-center items-center">
          <PuffLoader color="#1a1aff" />
        </div> :
        <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 grid place-items-center ">
          <div className="w-full h-screen sm:w-[350px] sm:h-[500px] body-img rounded-md shadow-lg ">
            <div className=" flex  justify-evenly mt-6 sm:mt-4  mx-4 text-white  ">
              <div className=" relative ">
                <input type="text" className=" bg-transparent border-b max-w-[80%] border-b-white outline-none pl-6 pr-2 "
                  placeholder='Enter location'
                  // placeholder={(location) ? 'enter location' : location}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <BiSearch size={18} className=" absolute top-1 left-0" />
              </div>
              <div className=' text-center'>
                <p className=" text-xl font-[400] ">{hours} : {minutes} {meridiem}</p>
                <p className=" text-xs">{day} {month} {year}</p>
                <p className=" text-xs">{dayName}</p>
              </div>
            </div>
            <Weatherbody data={data} />
          </div>
        </div>
    }
    </>
  )
}

export default App;