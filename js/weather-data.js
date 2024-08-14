import { getTime, getDay } from "./vars&funcs.js";

const appID = "3aba6475ce39110890ad01f7a40dbaa0"
const input = document.querySelector('#city')
const resetButton = document.querySelector("#reset-button")
const submitButton = document.querySelector("#submit-button")
let params = new URLSearchParams(window.location.search)
let city = params.get('city')
let latitude = params.get('latitude')
let longitude = params.get('longitude')
let clientTimeZone = (Math.abs(new Date().getTimezoneOffset()) * 60 * 1000)

// Не даём сделать запрос, если он вернет ошибку
document.addEventListener("submit", submit => {
    submit.preventDefault()
    let value = input.value.trim()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&units=metric&appid=${appID}`)
    .then(response => {
        if (response.ok) {
            window.location.search = `?city=${value}`
        }
    })
})

// Форматируем введенный текст при ошибке
input.addEventListener('input', () => {
    let value = input.value.trim()
    if (value.length >= 3) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&units=metric&appid=${appID}`)
        .then(response => {
            if (response.ok) {
                input.style.cssText = "letter-spacing: inherit; opacity: 1;"
                resetButton.style.display = "none"
                submitButton.style.display = "block"
            } else {
                input.style.cssText = "letter-spacing: 0.1em; opacity: 0.5;"
                resetButton.style.display = "block"
                submitButton.style.display = "none"
            }
        })
    } else {
        input.style.cssText = "letter-spacing: inherit;"
        resetButton.style.display = "none"
        submitButton.style.display = "block"
    }
})

const geolocationSuccess = (position) => window.location.search = `?latitude=${(position.coords.latitude).toFixed(2)}&longitude=${(position.coords.longitude).toFixed(2)}`
const geolocationError = () => window.location.search = `?city=Москва`

// Генерируем нужную ссылку
const weatherUrl = (city) => {
    return (city 
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${appID}` 
        : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${appID}`
    )
}

// Генерируем нужную ссылку
const forecastUrl = (city) => {
    return (city 
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${appID}` 
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${appID}`
    )
}

// Если параметров нет, задаем их, используя местоположение клиента
if (!window.location.search) {
    window.navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
}

// Запрашиваем данные с сервера 
let mainWeatherData = await fetch(weatherUrl(city)).then(response => response.json())
let forecastWeatherData = await fetch(forecastUrl(city)).then(response => response.json())

// Раскладываем данные по объектам и экспортируем
export let mainWeather = {  
    "time-zone" : mainWeatherData.timezone * 1000,
    "loc" : mainWeatherData.name,
    "temperature": Math.round(mainWeatherData.main.temp),
    "weather-text": mainWeatherData.weather[0].description,
    "weather-icon": mainWeatherData.weather[0].icon,
    "feel-temp" : Math.round(mainWeatherData.main['feels_like']),
}

export let cardsWeather = {
    "humidity" : {
        "value": mainWeatherData.main['humidity'],
        "min" : 0,
        "max" : 100
    },
    "pressure" : {
        "value": Math.round(mainWeatherData.main.pressure * 0.75),
        "min" : 700,
        "max" : 800
    },
    "visibility" : {
        "value": (mainWeatherData.visibility < 10000 
            ? (mainWeatherData.visibility / 1000).toFixed(1)
            : (mainWeatherData.visibility / 1000)),
        "min" : 0.1,
        "max" : 10
    },
    "sunrise" : mainWeatherData.sys.sunrise * 1000,
    "sunset" : mainWeatherData.sys.sunset * 1000,
    "wind" : {
        "speed": Math.round(mainWeatherData.wind.speed),
        "direction" : mainWeatherData.wind.deg
        }
}

export const forecastWeather = {
    "hours" : {},
    "daily" : {}
}

forecastWeatherData.list.slice(0, 8).map(element => {
    forecastWeather.hours[getTime((element.dt * 1000), clientTimeZone, mainWeather['time-zone'])] = {
        "temperature" : Math.round(element.main.temp),
        "weather-text": element.weather[0]["description"],
        "icon" : element.weather[0]["icon"]
    }
})

forecastWeatherData.list.map(element => {
    if (parseInt(element['dt_txt'].slice(11,13)) <= 16) {
        forecastWeather.daily[getDay((element.dt * 1000), clientTimeZone, mainWeather['time-zone'])] = {
            "temperature" : [Math.round(element.main.temp) - 4, Math.round(element.main.temp) + 4],
            "weather-text": element.weather[0]["description"],
            "icon" : element.weather[0]["icon"]
        }
    }
})

