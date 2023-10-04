import React from "react";

import { BsFillCloudsFill, BsCloudSnowFill, BsFillCloudDrizzleFill, BsFillCloudSunFill } from 'react-icons/bs'
import { MdLocationPin, MdVisibility } from 'react-icons/md'
import { FaTemperatureEmpty, FaCloudRain } from 'react-icons/fa6'
import { LuWind } from 'react-icons/lu'
import { WiHumidity, WiDaySunnyOvercast } from 'react-icons/wi'
import { RiHazeLine } from 'react-icons/ri'
import { IoMdSunny } from 'react-icons/io'


function Weatherbody({ data }) {
    // console.log(data);
    // console.log(data.weather[0].main)
    const status = data.weather[0].main;


    let statusPic;
    // const statusFun = () => {
    switch (status) {
        case 'Haze':
            statusPic = <RiHazeLine size={70} />
            break;
        case 'Clouds':
            statusPic = <BsFillCloudsFill size={70} />
            break;
        case 'Drizzle':
            statusPic = <BsFillCloudDrizzleFill size={70} />
            break;
        case 'Clear':
            statusPic = <IoMdSunny size={70} />
            break;
        case 'Rain':
            statusPic = <FaCloudRain size={70} />
            break;
        case 'Snow':
            statusPic = <BsCloudSnowFill size={70} />
            break;
        case 'Overcast':
            statusPic = <WiDaySunnyOvercast size={70} />
            break;

        default:
            statusPic = <BsFillCloudSunFill size={70} />
            break;
    }
    // }

    // useEffect(() => {
    //     statusFun();
    // }, [status]);

    return (
        <>
            {
                (data) ?
                    <div>
                        <div className=" mt-16 sm:mt-12 text-center text-white font-semibold">
                            <h1 className=" text-5xl flex justify-center items-center py-2 gap-x-1 font-Merriweather"><MdLocationPin size={38} />{data.name}</h1>
                            <div className="flex text-white justify-center items-center my-4 sm:my-2 gap-3">
                                <div>{statusPic}</div>
                                {/* {console.log(statusPic)} */}
                                <div>
                                    <h1 className=" text-4xl pt-2">{Math.ceil(data.main.temp)} °C</h1>
                                    <p className=" text-lg">{status}</p>
                                </div>

                            </div>
                        </div>

                        <div className=" w-[300px] h-40 backdrop-blur-sm  bg-gray-600/30 mx-auto p-y rounded-md text-white shadow-slate-300 grid justify-items-center grid-cols-2 gap-4 p-4 mt-20 sm:mt-8 ">
                            <div>
                                <div className="flex items-center gap-2 text-xl">
                                    <FaTemperatureEmpty size={23} />
                                    <p>{data.main.pressure} hPa</p>
                                </div>
                                <p className="text-xs text-center pt-2">Preassure</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xl">
                                    <LuWind size={23} />
                                    <p>{data.wind.speed} km/h</p>
                                </div>
                                <p className="text-xs text-center pt-2">Wind Speed</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xl">
                                    <WiHumidity size={23} />
                                    <p>{data.main.humidity} %</p>
                                </div>
                                <p className="text-xs text-center pt-2">Humidity</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xl">
                                    <MdVisibility size={23} />
                                    <p>{(data.visibility) / 1000} km</p>
                                </div>
                                <p className="text-xs text-center pt-2">Visibility</p>
                            </div>
                        </div>
                    </div>
                    : <h1 className=" text-3xl grid place-items-center mt-12 text-white">Loading.....</h1>
            }
        </>
    );
}

export default Weatherbody;
