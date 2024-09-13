import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./themes"; 

function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [theme, setTheme] = useState("light");
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lon: 0 });

  const API_KEY = "b1b5d2a308750daddd759c02fe1ed6d9";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${
    isFahrenheit ? "imperial" : "metric"
  }&appid=${API_KEY}`;

  // Function to get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          getWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error(error)
      );
    } else {
      console.error("Geolocation is not available");
    }
  }, []);

  // Fetch weather by coordinates
  const getWeatherByCoordinates = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${
      isFahrenheit ? "imperial" : "metric"
    }&appid=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  // Function to get weather for searched location
  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((Response) => {
        setData(Response.data);
        setLocation("");
      });
    }
  };

  // Toggle between Fahrenheit and Celsius
  const toggleUnit = () => {
    setIsFahrenheit((prevState) => !prevState);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="controls">
          {/* Fahrenheit/Celsius Switch */}
          <div className="unit-switch">
            <span>°C</span>
            <Switch
              checked={isFahrenheit}
              onChange={toggleUnit}
              color="primary"
              inputProps={{ "aria-label": "unit switch" }}
            />
            <span>°F</span>
          </div>

          {/* Theme Switch */}
          <div className="theme-switch">
            <span>Light</span>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              color="primary"
              inputProps={{ "aria-label": "theme switch" }}
            />
            <span>Dark</span>
          </div>
        </div>

        <div className="search">
          <Paper
            component="form"
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

        {/* Display weather data */}
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°{isFahrenheit ? "F" : "C"}</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>

          {/* Additional data */}
          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                <p>Feels like</p>
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              </div>
              <div className="humidity">
                <p>Humidity</p>
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              </div>
              <div className="wind">
                <p>Wind speed</p>
                {data.wind ? <p className="bold">{data.wind.speed} km/h</p> : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
