// Данные с сервера
import { mainWeather, cardsWeather, forecastWeather } from "./weather-data.js";
import { translator, days, months, getTime, singleNumCorrect, capitalize, progressBarDraw, cardBarValue, windDirectionText } from "./vars&funcs.js";
const content = document.querySelector(".content")
const contentLoad = document.querySelector(".content-load")
const hoursButton = document.querySelector('#hours')
const dailyButton = document.querySelector('#days')
const hoursGallery = document.querySelector('.slider__carousel-hours')
const dailyGallery = document.querySelector('.slider__carousel-daily')
let clientTimeZone = (Math.abs(new Date().getTimezoneOffset()) * 60 * 1000)
let timeUTC = (Date.now() - clientTimeZone)
let TODAY = new Date(timeUTC + mainWeather['time-zone'])
let localDay = TODAY.getDay()
let localDate = TODAY.getDate()
let localMonth = TODAY.getMonth()
let localHour = TODAY.getHours()
let localMinute = TODAY.getMinutes()

// Установка времени
const dataSet = () => {
    const today = document.querySelector('.today__day')
    const time = document.querySelector('.today__time')
    today.textContent = `${days[localDay].full}, ${localDate} ${months[localMonth]}`
    today.setAttribute("datatime", `${months[localMonth]}-${localDate}`)
    time.textContent = `${singleNumCorrect(localHour)}:${singleNumCorrect(localMinute)}`
    time.setAttribute("datatime", `${singleNumCorrect(localHour)}:${singleNumCorrect(localMinute)}`)
}

// Рассчет времени до/после рассвета/рассвета
const timeCalc = (func, sunriseTime, sunsetTime) => {
    let sunrise = new Date(sunriseTime - clientTimeZone + mainWeather['time-zone'])
    let sunset = new Date(sunsetTime - clientTimeZone + mainWeather['time-zone'])
    let sunriseHour = sunrise.getHours()
    let sunriseMinute = sunrise.getMinutes()
    let sunriseTotalMinutes = (sunriseHour * 60) + sunriseMinute
    let sunsetHour = sunset.getHours()
    let sunsetMinute = sunset.getMinutes()
    let sunsetTotalMinutes = (sunsetHour * 60) + sunsetMinute
    let localTotalMinutes = (localHour * 60) + localMinute

    if (func === 'sunrise') {
        if ((sunsetTotalMinutes > localTotalMinutes) && (localTotalMinutes > sunriseTotalMinutes)) {
            let diff = localTotalMinutes - sunriseTotalMinutes
            let hour = Math.floor(Math.abs(diff) / 60)
            let minute = Math.abs(diff) % 60
            return `Прошло: ${singleNumCorrect(hour)}:${singleNumCorrect(minute)}`
        } else {
            let sum = sunriseTotalMinutes + (1440 - localTotalMinutes) 
            if (sum > 1440) {
                sum = sum - 1440
            }
            let hour = Math.floor(sum / 60)
            let minute = Math.abs(sum) % 60
            return `Осталось: ${singleNumCorrect(hour)}:${singleNumCorrect(minute)}`
        }
    } else {
        if ((sunsetTotalMinutes > localTotalMinutes) && (localTotalMinutes > sunriseTotalMinutes)) {
            let diff = sunsetTotalMinutes - localTotalMinutes
            let hour = Math.floor(diff / 60)
            let minute = diff % 60
            return `Осталось: ${singleNumCorrect(hour)}:${singleNumCorrect(minute)}`
        } else {
            let sum = localTotalMinutes + (1440 - sunsetTotalMinutes) 
            if (sum > 1440) {
                sum = sum - 1440
            }
            let hour = Math.floor(sum / 60)
            let minute = Math.abs(sum) % 60
            return `Прошло: ${singleNumCorrect(hour)}:${singleNumCorrect(minute)}`
        }
    }
}

// Функция заполнения основных данных 
const dataLoader = (mainWeather) => {
    //Устанавливаем дату и время
    dataSet()

    // Перебираем каждый параметр и заполняем
    Object.keys(mainWeather).forEach(param => {
        try {
            document.querySelector(`#${param}`).textContent = capitalize(mainWeather[param])
        } catch (error) {
            document.querySelector(`#weather-text-image`).src = `../public/icons/weather-text/${mainWeather[param]}.svg`
            document.querySelector(`#weather-text-image`).alt = mainWeather["weather-text"]
        }
    })
}

// Функция заполнения карточек
const cardsLoader = (cardsWeather) => {
    // Перебираем каждый параметр и заполняем
    Object.keys(cardsWeather).forEach(param => {
        if (['humidity', 'pressure', 'visibility'].includes(param)) {
            let progressPercent
            if (param === 'humidity') {
                progressPercent = cardsWeather[param].value
            } else if (param === 'pressure') {
                progressPercent = cardsWeather[param].value - 700
            } else {
                progressPercent = cardsWeather[param].value * 10
            }
            let card = `
            <article class="card">
                <div class="card__values">
                    <h4 class="card__values-title">${translator[param]}</h4>
                    <img src="public/icons/cards/${param}.svg" alt="${param}" class="card__values-icon" loading="lazy">
                    <p class="card__values-value" id="${param}">${cardsWeather[param].value}</p>
                </div>
                <div class="card__bar">
                    <input type="range" class="card__bar-progress" style="${progressBarDraw(progressPercent)}" min="${cardsWeather[param].min}" max="${cardsWeather[param].max}" step="any" value="${cardsWeather[param].value}" id="${param}-progress" disabled>
                    <div class="card__bar-values" style="${param === "humidity" ? "width: 100%;" : ""}">${cardBarValue(param, cardsWeather[param].value)}</div>
                </div>
            </article>`
            document.querySelector('.main__group').insertAdjacentHTML('beforeend', card)
        } else if (['sunrise', 'sunset'].includes(param)) {
            let card = `
            <article class="card">
                <div class="card__values">
                    <h4 class="card__values-title">${translator[param]}</h4>
                    <img src="public/icons/cards/${param}.svg" alt="${param}" class="card__values-icon" loading="lazy">
                    <p class="card__values-value" id="${param}">${getTime(cardsWeather[param], clientTimeZone, mainWeather['time-zone'])}</p>
                </div>
                <div class="card__bar">
                    <p class="card__bar-values">${timeCalc(param, cardsWeather['sunrise'], cardsWeather['sunset'])}</p>                
                </div>
            </article>`
            document.querySelector('.main__group').insertAdjacentHTML('beforeend', card)     
        } else {
            let card = `
            <article class="card">
                <div class="card__values">
                    <h4 class="card__values-title">${translator[param]}</h4>
                    <img src="public/icons/cards/${param}.svg" alt="${param}" class="card__values-icon" style="rotate: ${cardsWeather[param].direction}deg;" loading="lazy">
                    <p class="card__values-value" id="${param}">${cardsWeather[param].speed}</p>
                </div>
                <div class="card__bar">
                    <p class="card__bar-values">${windDirectionText(cardsWeather[param].direction)}</p>                
                </div>
            </article>`
            document.querySelector('.main__group').insertAdjacentHTML('beforeend', card)
        }
    })
}

// Функция заполнения прогноза
const sliderLoader = (forecastWeather) => {

    // Вычленяем нужные нам сущности
    const hoursWeather = forecastWeather['hours']
    const dailyWeather = forecastWeather['daily']
    let hoursKeys = Object.keys(hoursWeather)
    let dailyKeys = Object.keys(dailyWeather)
    
    // Перебираем и создаем карточки о часах
    hoursKeys.map(hour => {
        let element = hoursWeather[hour]
        let cardDateHour = parseInt(hour.split(":"))
        let pathTime = (cardDateHour <= 20 && cardDateHour >= 8) 
            ? "day" 
            : "night"
        let inner = `<li class="gallery__card">
                        <time datetime="${hour}" class="gallery__card-time">${hour}</time>
                        <img src="../public/icons/weather-text/${element['icon']}.svg" alt="${element['weather-text']}" title="${element['weather-text']}" class="gallery__card-image" loading="lazy">
                        <p class="gallery__card-temp">${element['temperature']}</p>
                    </li>`
        hoursGallery.querySelector('ul').insertAdjacentHTML('beforeend', inner)
    })

    // Перебираем и создаем карточки о днях
    dailyKeys.map(day => {
        let element = dailyWeather[day]
        let inner = `<li class="gallery__card">
                        <time class="gallery__card-time">${day}</time>
                        <img src="../public/icons/weather-text/${element['icon']}.svg" alt="${element['weather-text']}" title="${element['weather-text']}" class="gallery__card-image" loading="lazy">
                        <div class="gallery__card-temp">
                            <p>${element['temperature'][0]}</p><p>${element['temperature'][1]}</p>
                        </div>
                    </li>`
        dailyGallery.querySelector('ul').insertAdjacentHTML('beforeend', inner)
    })
}

// Проверяем значение по умолчанию
hoursButton.checked 
    ? hoursGallery.style.display = "flex" 
    : dailyGallery.style.display = "flex"

// Прослушиваем кнопки
hoursButton.addEventListener('click', () => {
    hoursGallery.style.display = "flex"
    dailyGallery.style.display = "none"
})
dailyButton.addEventListener('click', () => {
    hoursGallery.style.display = "none"
    dailyGallery.style.display = "flex"
})

// После заполнения красиво показываем данные
dataLoader(mainWeather)
cardsLoader(cardsWeather)
sliderLoader(forecastWeather)
content.style.opacity = "1"
contentLoad.style.opacity = "0"
contentLoad.style.display = "none"