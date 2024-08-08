import { useState } from "react";
import axios from "axios";
import "./App.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b1b5d2a308750daddd759c02fe1ed6d9`;

  const [activetheme, setActiveTheme] = useState("");
  const handleTheme = (theme) =>{
    document.body.style.background = theme;
    setActiveTheme(theme);
  }

  const themes = [
    {theme: ""}
  ]

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
        <Paper
          // onSubmit={searchLocation}
          component="paper"
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
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            {/* <h1>{data.main.temp}</h1>   makes the display disapper*/}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
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
