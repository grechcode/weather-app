import { getTime, getDay } from "./vars&funcs.js";

const appID = "3aba6475ce39110890ad01f7a40dbaa0"
const form = document.querySelector('.header__form')
const input = document.querySelector('#city')
let params = new URLSearchParams(window.location.search)
let city = params.get('city')
let latitude = params.get('latitude')
let longitude = params.get('longitude')
let clientTimeZone = (Math.abs(new Date().getTimezoneOffset()) * 60 * 1000)

// Не даём сделать запрос, если он вернет ошибку
form.addEventListener("submit", submit => {
    submit.preventDefault()
    let value = input.value.trim()
    fetch(`https://ru.api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&units=metric&appid=${appID}`)
    .then(response => {
        if (response.ok) {
            form.submit()
        } else {
            input.style.cssText = "animation: uncorrect 0.4s;"
        }
    })
    input.style.animation = 'none'
})

// Если параметров нет, задаем их, используя местоположение клиента
if (!window.location.search) {
    const geolocationSuccess = (position) => window.location.search = `?latitude=${(position.coords.latitude).toFixed(2)}&longitude=${(position.coords.longitude).toFixed(2)}`
    const geolocationError = () => window.location.search = `?city=Москва`
    window.navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
}

async function getWeatherData() {
    let location = (city 
        ? `https://ru.api.openweathermap.org/data/2.5/weather?q=${city.trim()}&lang=ru&units=metric&appid=${appID}` 
        : `https://ru.api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${appID}`
    )
    let response = await fetch(location)
    let weatherData = await response.json()
    return weatherData
}

async function getForecastData() {
    let location = (city 
        ? `https://ru.api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&lang=ru&units=metric&appid=${appID}` 
        : `https://ru.api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${appID}`
    )
    let response = await fetch(location)
    let forecstData = await response.json()
    return forecstData
}

// Запрашиваем данные с сервера 
let weatherData = await getWeatherData()
let forecastData = await getForecastData()

// Раскладываем данные по объектам и экспортируем
export let mainWeather = {  
    "time-zone" : weatherData.timezone * 1000,
    "loc" : weatherData.name,
    "temperature": Math.round(weatherData.main.temp),
    "weather-text": weatherData.weather[0].description,
    "weather-icon": weatherData.weather[0].icon,
    "feel-temp" : Math.round(weatherData.main['feels_like']),
}

export let cardsWeather = {
    "humidity" : {
        "value": weatherData.main['humidity'],
        "min" : 0,
        "max" : 100
    },
    "pressure" : {
        "value": Math.round(weatherData.main.pressure * 0.75),
        "min" : 700,
        "max" : 800
    },
    "visibility" : {
        "value": ((weatherData.visibility % 1000 === 0) 
            ? (weatherData.visibility / 1000)
            : (weatherData.visibility / 1000).toFixed(1)),
        "min" : 0.1,
        "max" : 10
    },
    "sunrise" : weatherData.sys.sunrise * 1000,
    "sunset" : weatherData.sys.sunset * 1000,
    "wind" : {
        "speed": Math.round(weatherData.wind.speed),
        "direction" : weatherData.wind.deg
        }
}

export const forecastWeather = {
    "hours" : {},
    "daily" : {}
}

forecastData.list.slice(0, 8).map(element => {
    forecastWeather.hours[getTime((element.dt * 1000), clientTimeZone, mainWeather['time-zone'])] = {
        "temperature" : Math.round(element.main.temp),
        "weather-text": element.weather[0]["description"],
        "icon" : element.weather[0]["icon"]
    }
})

forecastData.list.map(element => {
    if (parseInt(element['dt_txt'].slice(11,13)) <= 16) {
        forecastWeather.daily[getDay((element.dt * 1000), clientTimeZone, mainWeather['time-zone'])] = {
            "temperature" : [Math.round(element.main.temp) - 4, Math.round(element.main.temp) + 4],
            "weather-text": element.weather[0]["description"],
            "icon" : element.weather[0]["icon"]
        }
    }
})

