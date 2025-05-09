"use client"
import { useEffect, useState } from "react"
import getForecast from "./api"
import ImageForecast from "./image"

const Forecast = () => {
    type ForecastDataType = {
        "request": {
            "type": string,
            "query": string,
            "language": string,
            "unit": string
        },
        "location": {
            "name": string,
            "country": string,
            "region": string,
            "lat": string,
            "lon": string,
            "timezone_id": string,
            "localtime": string,
            "localtime_epoch": number,
            "utc_offset": string
        },
        "current": {
            "observation_time": string,
            "temperature": number,
            "weather_code": number,
            "weather_icons": [
                string
            ],
            "weather_descriptions": [
                string
            ],
            "air_quality": {
                "co": string,
                "no2": string,
                "o3": string,
                "so2": string,
                "pm2_5": string,
                "pm10": string,
                "us-epa-index": string,
                "gb-defra-index": string
            },
            "wind_speed": number,
            "wind_degree": number,
            "wind_dir": string,
            "pressure": number,
            "precip": number,
            "humidity": number,
            "cloudcover": number,
            "feelslike": number,
            "uv_index": number,
            "visibility": number,
            "is_day": string
        },
        "forecast": {
            "2025-05-08": {
                "date": string,
                "date_epoch": number,
                "astro": {
                    "sunrise": string,
                    "sunset": string,
                    "moonrise": string,
                    "moonset": string,
                    "moon_phase": string,
                    "moon_illumination": number
                },
                "mintemp": number,
                "maxtemp": number,
                "avgtemp": number,
                "totalsnow": number,
                "sunhour": number,
                "uv_index": number,
                "air_quality": {
                    "co": string,
                    "no2": string,
                    "o3": string,
                    "so2": string,
                    "pm2_5": string,
                    "pm10": string,
                    "us-epa-index": string,
                    "gb-defra-index": string
                }
            }
        }
    }
    const [forecastData, setForecastData] = useState<ForecastDataType>({
        "request": {
            "type": "",
            "query": "",
            "language": "",
            "unit": ""
        },
        "location": {
            "name": "",
            "country": "",
            "region": "",
            "lat": "",
            "lon": "",
            "timezone_id": "",
            "localtime": "",
            "localtime_epoch": 0,
            "utc_offset": ""
        },
        "current": {
            "observation_time": "",
            "temperature": 0,
            "weather_code": 0,
            "weather_icons": [
                ""
            ],
            "weather_descriptions": [
                ""
            ],
            "air_quality": {
                "co": "",
                "no2": "",
                "o3": "",
                "so2": "",
                "pm2_5": "",
                "pm10": "",
                "us-epa-index": "",
                "gb-defra-index": ""
            },
            "wind_speed": 0,
            "wind_degree": 0,
            "wind_dir": "",
            "pressure": 0,
            "precip": 0,
            "humidity": 0,
            "cloudcover": 0,
            "feelslike": 0,
            "uv_index": 0,
            "visibility": 0,
            "is_day": ""
        },
        "forecast": {
            "2025-05-08": {
                "date": "",
                "date_epoch": 0,
                "astro": {
                    "sunrise": "",
                    "sunset": "",
                    "moonrise": "",
                    "moonset": "",
                    "moon_phase": "",
                    "moon_illumination": 0
                },
                "mintemp": 0,
                "maxtemp": 0,
                "avgtemp": 0,
                "totalsnow": 0,
                "sunhour": 0,
                "uv_index": 0,
                "air_quality": {
                    "co": "",
                    "no2": "",
                    "o3": "",
                    "so2": "",
                    "pm2_5": "",
                    "pm10": "",
                    "us-epa-index": "",
                    "gb-defra-index": ""
                }
            }
        }
    })
    useEffect(() => {
        getForecast().then(data => {
            setForecastData(data)
            console.log(data)
        })
    }, [])

    return (<>
        {forecastData ? (
        <div className="leading-5">
            <div>{forecastData.location.name}</div>
            <div>{forecastData.location.region}</div>
            <div>{forecastData.location.country}</div>
            <div className="text-4xl font-extrabold">{forecastData.current.temperature}<sup>o</sup>C</div>
            <div>{forecastData.current.weather_descriptions}</div>
        </div>
        ):(
            <div></div>
        )}
        {/* <Image src={forecastData.current.weather_icons[0]} /> */}
    </>)
}

export default Forecast