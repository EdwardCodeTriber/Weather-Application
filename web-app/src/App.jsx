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
            
            <h1>{data.main.temp} </h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">60*F</p>
            <p>Temperature</p>
          </div>
          <div className="humidity">
            <p className="bold">20%</p>
            {/* <p>{data.main.humidity}</p> */}
          </div>
          <div className="wind">
            <p className="bold">44km/h</p>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
