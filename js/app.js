const infoBtns = document.querySelectorAll('.info-dot')
const infoHints = document.querySelectorAll('.info-hint')

for(let btn of infoBtns) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation()
        const infoHint = this.parentNode.querySelector('.info-hint')
        infoHint.classList.toggle('none')
    })
}


document.addEventListener('click', function (){
    for(let hint of infoHints) {
        hint.classList.add('none')
    }
})

for(let hint of infoHints) {
    hint.addEventListener('click', (e) => e.stopPropagation() )
}


//SWIPER

const swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
})

// COUNTDOWN

let countDownDate = new Date("Feb 3, 2024 00:00:00").getTime()
let x = setInterval(function(){
    let now = new Date().getTime()
    const distance = countDownDate - now

    const days = Math.floor(distance / (1000*60*60*24))
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60))
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60))
    const seconds = Math.floor((distance % (1000*60)) / 1000)

    document.querySelector("#days").innerHTML = days
    document.querySelector("#hours").innerHTML = hours
    document.querySelector("#minutes").innerHTML = minutes
    document.querySelector("#seconds").innerHTML = seconds

    if(distance < 0){
        clearInterval(x)
        document.querySelector("#days").innerHTML = "00"
        document.querySelector("#hours").innerHTML = "00"
        document.querySelector("#minutes").innerHTML = "00"
        document.querySelector("#seconds").innerHTML = "00"
    }

},1000)

//BESTSELLER Products slider

const productCards = document.querySelectorAll('.product-cards')
const tabButtons = document.querySelectorAll('.tab-controls__btn')
const tabParent = document.querySelector('.tab-controls')
let currentTab = 0

const hideProductCards = () => {
    productCards.forEach((page) => {
        page.style.display = 'none'
    })
    tabButtons.forEach((tab) => {
        tab.classList.remove('tab-controls__btn--active')
    })

}

const showProductCards = (i = 0) => {
    productCards[i].style.display = 'flex'
    tabButtons[i].classList.add('tab-controls__btn--active')
}

const autoTabSlider = () => {
    hideProductCards()
    currentTab++
    if(currentTab > tabButtons.length - 1) {
        currentTab = 0
    }
    showProductCards(currentTab)
}

hideProductCards()
showProductCards()
setInterval(autoTabSlider, 10000)

tabParent.onclick = (e) => {
    if(e.target.classList.contains('tab-controls__btn')) {
        tabButtons.forEach((tabBtn, tabIndex) => {
            if(e.target === tabBtn) {
                currentTab = tabIndex
                hideProductCards()
                showProductCards(currentTab)
            }
        })
    }
}

//BestSeller tabSlider

const tabSlider = new Swiper(".products__slider", {
    slidesPerView: 3.3,
    freeMode: true,
})
const tabSlider2 = new Swiper(".products__slider2", {
    slidesPerView: 3.3,
    freeMode: true,
})
const tabSlider3 = new Swiper(".products__slider3", {
    slidesPerView: 3.3,
    freeMode: true,
})
const tabSlider4 = new Swiper(".products__slider4", {
    slidesPerView: 3.3,
    freeMode: true,
})
