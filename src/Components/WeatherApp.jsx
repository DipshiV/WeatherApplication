import React, { useState} from 'react';
import './WeatherApp.css';
import axios from 'axios';

const WeatherApp = () => {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: 'https://cdn-icons-png.flaticon.com/512/3845/3845731.png'
    })
    const [name, setName] = useState('');
    
    const handleCity=()=>{
        if(name !== ""){
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q= ${name} &appid=040433f890fd00f918b93c5683eeafdc&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main == "Clouds"){
                    imagePath = "'https://cdn-icons-png.flaticon.com/512/3845/3845731.png'"
                }else if(res.data.weather[0].main == "Clear"){
                    imagePath = "https://static-00.iconduck.com/assets.00/weather-clear-symbolic-icon-2048x2048-v4afvu7m.png";
                }else if(res.data.weather[0].main == "Rain"){
                    imagePath = "https://cdn.pixabay.com/photo/2020/02/05/09/02/cloud-4820504_640.jpg";
                }else if(res.data.weather[0].main == "Drizzle"){
                    imagePath = "https://www.shutterstock.com/image-photo/drizzle-on-windshield-evening-600nw-667415725.jpg";
                }else if(res.data.weather[0].main == "Mist"){
                    imagePath = "https://cdn.pixabay.com/photo/2013/04/01/09/22/heavy-rain-98539_640.png";
                }else {
                    imagePath = "https://cdn-icons-png.flaticon.com/512/3845/3845731.png";
                }
                console.log(res.data);
                setData({...data,celcius: res.data.main.temp ,
                     name: res.data.name,
                      humidity:res.data.main.humidity,
                speed: res.data.wind.speed,
            image: imagePath})
            })
            .catch(err => console.log(err));
        }
    }
   
  return (
    <div className='container'>
    <div className='weather'>
    <div className='search'>
    <input type='text' placeholder='Enter City Name' onChange={((e)=> setName(e.target.value))}/>
    <button><img src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png" alt='search' onClick={handleCity}/></button>
    </div>
    <div className='winfo'>
    <img className='icon'src={data.image} alt='cloud image'/>
    <h1>{data.celcius}°C</h1>
    <h2>{data.name}</h2>
    <div className='details'>
    <div className='col'>
    <img src='https://static-00.iconduck.com/assets.00/humidity-icon-512x419-5m7ztixz.png' alt='humidity image'/>
    <div className='humidity'>
    <p>{Math.round(data.humidity)}%</p>
    <p>Humidity</p>
    </div>
    </div>

    <div className='col'>
    <img src='https://w7.pngwing.com/pngs/847/483/png-transparent-computer-icons-wind-symbol-winds-text-cloud-logo-thumbnail.png' alt='wind image'/>
    <div className='wind'>
    <p>{Math.round(data.speed)}km/h</p>
    <p>wind</p>
    </div>
    </div>

    </div>
    </div>
    </div>
    </div>
    
  

  )
}

export default WeatherApp