export const translator = {
    "humidity" : "Влажность",
    "pressure": "Давление",
    "sunrise" : "Рассвет",
    "sunset": "Закат",
    "visibility" : "Видимость",
    "wind": "Сила ветра"
}

export const days = {
    0: {
        full: "Воскресение",
        short: "Вс"
    },
    1: {
        full: "Понедельник",
        short: "Пн"
    },
    2: {
        full: "Вторник",
        short: "Вт"
    },
    3: {
        full: "Среда",
        short: "Ср"
    },
    4: {
        full: "Четверг",
        short: "Чт"
    },
    5: {
        full: "Пятница",
        short: "Пт"
    },
    6: {
        full: "Суббота",
        short: "Сб"
    },
}

export const months = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "фпреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
}

// Возвращаем **:** из миллисекунд
export const getTime = (value, clientTimeZone, cityTimeZone) => {
    let time = new Date(value - clientTimeZone + cityTimeZone)
    let hours = time.getHours()
    let minutes = time.getMinutes()
    return `${singleNumCorrect(hours)}:${singleNumCorrect(minutes)}`
}

// Возвращаем дату из миллисекунд
export const getDay = (value, clientTimeZone, cityTimeZone) => {
    let vauleTime = new Date(value - clientTimeZone + cityTimeZone)
    let day = days[vauleTime.getDay()].short
    let date = (vauleTime.getDate() < 10 ? `0${vauleTime.getDate()}` : vauleTime.getDate())
    let month = months[vauleTime.getMonth()].slice(0, 3)
    return `${day}, ${date} ${month}.`
}

// Добавляем 0 перед одиночной цифрой
export const singleNumCorrect = (number) => {
    if (number < 10) {
        return `0${number}`
    } else {
        return number
    }
}

// Возвращаем строку с большой буквы
export const capitalize = (word) => {
    try {
        return word[0].toUpperCase() + word.substring(1)
    } catch {
        return word
    }
}

// Стиль для progress-bar
export const progressBarDraw = (value) => {
    let finishStyle
    if (window.outerWidth <= 640) {
        finishStyle = `mask: radial-gradient(circle at calc(0.91 * ${value}% + 3.3px), white 3px, transparent 3px, transparent 4.5px, rgba(218, 218, 218, 0.4) 4.5px);`
    } else {
        finishStyle = `mask: radial-gradient(circle at calc(0.94 * ${value}% + 3.6px), white 4px, transparent 4px, transparent 6px, rgba(218, 218, 218, 0.4) 6px);`
    }
    return finishStyle
}

// Возварщает нормы из значений
export const cardBarValue = (param, value) => {
    if (param === 'humidity') {
        return `<span>0%</span>
                <span>100%</span>`
    } else if (param === 'pressure') {
        if (value <= 746) {
            return 'Низкое'
        } else if (value <= 753) {
            return 'Нормальное'
        } else {
            return 'Повышенное'
        }
    } else if (param === 'visibility') {
        if (value <= 0.5) {
            return 'Очень плохая'
        } else if (value <= 2) {
            return 'Плохая'
        } else if (value <= 5) {
            return 'Средняя'
        } else if (value <= 7) {
            return 'Нормальная'
        } else {
            return 'Безупречная'
        }
    }
}

// Возвращает направление из градуса
export const windDirectionText = (value) => {
    if (value <= 10 || value >= 350) {
        return "Северный"
    } else if (value <= 80) {
        return "Северо-восточный"
    } else if (value <= 100) {
        return "Восточный"
    } else if (value <= 170) {
        return "Юго-восточный"
    } else if (value <= 190) {
        return "Южный"
    } else if (value <= 260) {
        return "Юго-западный"
    } else if (value <= 280) {
        return "Западный"
    } else if (value <= 350) {
        return "Северо-западный"
    } 
} 