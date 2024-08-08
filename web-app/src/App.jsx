import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b1b5d2a308750daddd759c02fe1ed6d9`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((Response) => {
        setData(Response.data);
        console.log(Response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search for a location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}</h1> : null}
            {/* <h1>{data.main.temp}</h1>   makes the display disapper*/}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>Feels like</p>
            {data.main ? (
              <p className="bold">{data.main.feels_like}°C</p>
            ) : null}
          </div>
          <div className="humidity">
            <p>Humidity</p>
            {data.main ? <p className="bold">{data.main.humidity}</p> : null}
          </div>
          <div className="wind">
            <p>Wind speed</p>
            {data.wind ? <p className="bold">{data.wind.speed}km/h</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
