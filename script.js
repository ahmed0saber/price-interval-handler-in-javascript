const priceHandlers = document.querySelectorAll(".price-handler"),
    minPriceHandler = document.querySelector(".min-price-handler"),
    maxPriceHandler = document.querySelector(".max-price-handler"),
    priceRange = document.querySelector(".price-range"),
    coveredPriceBar = document.querySelector(".price-bar span"),
    minPriceAmountHolder = document.querySelector(".min-price-amount"),
    maxPriceAmountHolder = document.querySelector(".max-price-amount"),
    minPriceAmount = parseInt(minPriceAmountHolder.textContent), maxPriceAmount = parseInt(maxPriceAmountHolder.textContent)

const handleSlidersMovement = (e) => {
    let eventPositionX, eventPositionY, isMinPriceHandler = e.target.classList.contains("min-price-handler")
    if (e.type === "touchmove") {
        eventPositionX = e.touches[0].clientX
        eventPositionY = e.touches[0].clientY
    } else {
        eventPositionX = e.clientX
        eventPositionY = e.clientY
    }
    if(eventPositionX < priceRange.getBoundingClientRect().left || 
        eventPositionX > priceRange.getBoundingClientRect().left + priceRange.offsetWidth || 
        eventPositionY < priceRange.getBoundingClientRect().top || 
        eventPositionY > priceRange.getBoundingClientRect().top + priceRange.offsetHeight){
        handleMouseUp(e)
        return
    }
    updateSlidersPosition(eventPositionX, isMinPriceHandler)
    updateCoveredPriceBar()
    updatePriceHolders()
}

const handleMouseDown = (e) => {
    e.preventDefault()
    if (e.type === "mousedown") {
        window.addEventListener("mousemove", handleSlidersMovement)
    } else {
        window.addEventListener("touchmove", handleSlidersMovement)
    }
}

const handleMouseUp = (e) => {
    if (e.type === "mouseup" || e.type === "mousemove") {
        window.removeEventListener("mousemove", handleSlidersMovement)
    } else {
        window.removeEventListener("touchmove", handleSlidersMovement)
    }
}

const updatePriceHolders = () => {
    let priceStart = Math.floor(((priceRange.offsetWidth - minPriceHandler.offsetLeft - priceHandlers[0].offsetWidth) / priceRange.offsetWidth) * (maxPriceAmount - minPriceAmount))
    let priceEnd = Math.floor(((priceRange.offsetWidth - maxPriceHandler.offsetLeft) / priceRange.offsetWidth) * (maxPriceAmount - minPriceAmount))
    minPriceAmountHolder.textContent = priceStart
    maxPriceAmountHolder.textContent = priceEnd
}

const updateCoveredPriceBar = () => {
    coveredPriceBar.style.width = minPriceHandler.offsetLeft - maxPriceHandler.offsetLeft + priceHandlers[0].offsetWidth + "px"
    coveredPriceBar.style.right = priceRange.offsetWidth - minPriceHandler.offsetLeft - priceHandlers[0].offsetWidth + "px"
}

const updateSlidersPosition = (eventPositionX, isMinPriceHandler) => {
    let positionRight = priceRange.offsetWidth - (eventPositionX - priceRange.getBoundingClientRect().left) - (priceHandlers[0].offsetWidth / 2)
    if (isMinPriceHandler) {
        if (positionRight > 0 && positionRight < priceRange.offsetWidth - maxPriceHandler.offsetLeft - priceHandlers[0].offsetWidth) {
            minPriceHandler.style.right = Math.floor(positionRight) + "px"
        }
    } else {
        if (positionRight < priceRange.offsetWidth - priceHandlers[0].offsetWidth && positionRight > priceRange.offsetWidth - minPriceHandler.offsetLeft - priceHandlers[0].offsetWidth) {
            maxPriceHandler.style.right = Math.ceil(positionRight) + "px"
        }
    }
}

priceHandlers.forEach(priceHandler => {
    priceHandler.addEventListener("mousedown", handleMouseDown)
    priceHandler.addEventListener("mouseup", handleMouseUp)
    priceHandler.addEventListener("touchstart", handleMouseDown)
    priceHandler.addEventListener("touchend", handleMouseUp)
})