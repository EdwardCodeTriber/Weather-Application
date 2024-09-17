import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import getApiWeatherData from "./service/weatherservice";
// import getFormat from "./service/weatherservice";

function App() {
  //usestates to hold data on searched location
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [hourly, setHourly] = useState("")
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&forcast?q=${location}&units=imperial&appid=b1b5d2a308750daddd759c02fe1ed6d9&units=${
    isFahrenheit ? "imperial" : "metric"
  }`;


  const fetchWeather = async (location) => {
    const url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b1b5d2a308750daddd759c02fe1ed6d9&units=${
        isFahrenheit ? "imperial" : "metric"
      }`
    );
    const data = await url.json();
    setData(data);
  };

  /////////////////////////

  // function to take searched location
  const searchLocation = (e) => {
    if (e.key === "Enter") {
      // used axios to get url data object
      axios.get(url).then((Response) => {
        setData(Response.data);
        // see results on the data received on search
        console.log(Response.data);
      });
      setLocation("");
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location, isFahrenheit]);

  return (
    <div className="App">
      <div className="search">
        <Paper
          // onSubmit={searchLocation}
          component="paper"
          elevation={12}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            margin: "auto",
            width: 400,
            background: "rgba(80, 80, 80, 0.8)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Search location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            inputProps={{ "aria-label": "Search location" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {data.main.temp}°{isFahrenheit ? "F" : "C"}
              </h1>
            ) : null}
            {/* {data.timezone ? <p>{data.timezone}</p> : null} */}
            {data.main ? (
              <Switch
                checked={isFahrenheit}
                onChange={() => setIsFahrenheit(!isFahrenheit)}
                inputProps={{ "aria-label": "Toggle Fahrenheit/Celsius" }}
              />
            ) : null}

            {/* <h1>{data.main.temp}</h1>   makes the display disapper*/}
          </div>
          <div className="description">
            {/* Print details of specified data from the url */}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°{isFahrenheit ? "F" : "C"}</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind speed</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed} km/h</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
