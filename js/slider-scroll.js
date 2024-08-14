const tabs = document.querySelector('.slider__carousel').querySelectorAll('ul')

tabs.forEach(gallery => {
    let previousButton = gallery.previousElementSibling
    let nextButton = gallery.nextElementSibling

    // Отслеживаем скролл
    gallery.addEventListener('scroll', () => {

        // Рассчитываем конец скролла
        let calc = gallery.scrollLeft + gallery.clientWidth

        // Активируем/дезактивируем кнопки
        if (Math.round(calc) === Math.round(gallery.clientWidth)) {
            previousButton.disabled = true
            nextButton.disabled = false
        } else if (Math.round(calc) === Math.round(gallery.scrollWidth)) {
            previousButton.disabled = false
            nextButton.disabled = true
        } else if (Math.round(gallery.clientWidth) < Math.round(calc) < Math.round(gallery.scrollWidth)) {
            previousButton.disabled = false
            nextButton.disabled = false
        } 
    })
    
    // Слушаем кнопки
    previousButton.addEventListener('click', () => {
        gallery.scrollBy({ left: -1, behavior: 'smooth'})
    })
    nextButton.addEventListener('click', () => {
        gallery.scrollBy({ left: 1, behavior: 'smooth'})
    })
})






