// import { axios } from "axios";

import { DateTime } from "luxon";

const API_KEY = "b1b5d2a308750daddd759c02fe1ed6d9";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getApiWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appID: API_KEY });

  //fetch get data
  return fetch(url)
    .then((Response) => Response.json())
    .then((data) => data);
};

const iconurl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

/// function to format time

const formatTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main, details, icon } = weather[0];
  const localTime = formatTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatTime(sunrise, timezone, "hh:mm a"),
    sunset: formatTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconurl(icon),
    localTime,
    dt,
    timezone,
    lat,
    lon
  };
};

const formatWeather = (secs, offset, data) =>{
    const hourly =
    data.filter(f =>f.dt > secs )
    .slice(0, 5)
    .map(f => ({
        temp: f.main.temp,
        title: formatTime(f.dt, offset, "hh:mm a"),
        date: f.dt_txt,
    }));

    return{hourly}
}

const getFormat = async (searchParams) => {
  const formatData = await getApiWeatherData("weather", searchParams).then(
    formatCurrent
  );
const {dt, lat , lon, timezone} = formatData;
const formatForecast = await getApiWeatherData('forecast', {lat, lon, units: searchParams.units,}).then
(d => formatForecast(dt, timezone, d.list))

  return { ...formatData, ...formatWeather };
};


export default getFormat;
