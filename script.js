const priceHandlers = document.querySelectorAll(".price-handler"),
    minPriceHandler = document.querySelector(".min-price-handler"),
    maxPriceHandler = document.querySelector(".max-price-handler"),
    priceRange = document.querySelector(".price-range"),
    coveredPriceBar = document.querySelector(".price-bar span"),
    minPriceAmountHolder = document.querySelector(".min-price-amount"),
    maxPriceAmountHolder = document.querySelector(".max-price-amount"),
    minPriceAmount = parseInt(minPriceAmountHolder.textContent), maxPriceAmount = parseInt(maxPriceAmountHolder.textContent)

const handleSlidersMovement = (e) => {
    let eventPosition, isMinPriceHandler = e.target.classList.contains("min-price-handler")
    if (e.type === "touchmove") {
        eventPosition = e.touches[0].clientX
    } else {
        eventPosition = e.clientX
    }
    if(eventPosition < priceRange.getBoundingClientRect().left || eventPosition > priceRange.getBoundingClientRect().left + priceRange.offsetWidth){
        handleMouseUp(e)
        return
    }
    updateSlidersPosition(eventPosition, isMinPriceHandler)
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

const updateSlidersPosition = (eventPosition, isMinPriceHandler) => {
    let positionRight = priceRange.offsetWidth - (eventPosition - priceRange.getBoundingClientRect().left) - (priceHandlers[0].offsetWidth / 2)
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