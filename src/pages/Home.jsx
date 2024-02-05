import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Transition } from 'react-transition-group';

function Homepage() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api = {
        key: 'd8f4c983d940040113adad1849931a1f',
        base: 'https://api.openweathermap.org/data/2.5/',
    };

    useEffect(() => {
        if (city) {
            const fetchWeatherData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
                    );
                    setWeatherData(response.data);
                    setError(null);
                } catch (error) {
                    // console.error('Weather data fetch error:', error);
                    setError('Error fetching weather data. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            fetchWeatherData();
        }
    }, [city]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const clearInput = () => {
        setCity('');
        setWeatherData(null);
        setError(null)
    };

    return (
        <div className="h-[91%] w-full flex justify-center items-center bg-gradient-to-r from-gray-600 to-gray-900">
            <div className="bg-white rounded-lg py-9 px-28 shadow-md h-[70%] w-[40%]">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Weather App</h1>
                <div className="flex gap-5">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={handleCityChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={clearInput}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Clear
                    </button>
                </div>
                <Transition in={loading} timeout={300} unmountOnExit>
                    {(state) => (
                        <p className={`text-gray-700 text-lg text-center transition-opacity duration-300 ${state === 'entered' && 'opacity-100'} ${state === 'exited' && 'opacity-0'}`}>
                            Loading...
                        </p>
                    )}
                </Transition>

                {error && (
                    <p className="text-red-500 text-lg text-center ">Error fetching weather data. Please try again.</p>
                )}

                {weatherData ?
                    (<Transition in={weatherData} timeout={300} unmountOnExit>
                        {(state) => (
                            <div className={`text-center text-gray-800 transition-opacity duration-300 ${state === 'entered' && 'opacity-100'} ${state === 'exited' && 'opacity-0'} py-5`}>
                                <h2 className="text-xl font-semibold mb-4">Weather in {city}</h2>
                                <p className="text-lg mb-2">
                                    Temperature: {weatherData?.main.temp} °C
                                </p>
                                <p className="text-lg mb-2">
                                    Humidity: {weatherData?.main.humidity}%
                                </p>
                                <p className="text-lg mb-2">
                                    Wind Speed: {weatherData?.wind.speed} m/s
                                </p>
                                <p className="text-lg mb-2">
                                    Sunrise: {new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString()}
                                </p>
                                <p className="text-lg mb-4">
                                    Sunset: {new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString()}
                                </p>
                                <p className="text-lg mb-4">
                                    Description: {weatherData?.weather[0].description}
                                </p>
                            </div>
                        )}
                    </Transition>) : (
                        <div className='w-full text-center pt-14'>
                            <h1 className='text-black'>Know your city weather</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Homepage;
