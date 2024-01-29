function random(min, max) {
    return Math.random() * (max - min) + min
}

class Blob {
    constructor(el) {
        this.el = el
        this.size = el.getBoundingClientRect().width
        this.x = random(0, window.innerWidth - this.size)
        this.y = random(0, window.innerHeight - this.size)
        this.vx = random(1, 1.5) * Math.random() > 0.5 ? -1 : 1
        this.vy = random(1, 1.5) * Math.random() > 0.5 ? -1 : 1
    }

    update(){
        this.x += this.vx
        this.y += this.vy

        if(this.x >= window.innerWidth - this.size){
            this.vx *= -1
            this.x = window.innerWidth - this.size
        }

        if(this.y >= window.innerHeight - this.size){
            this.vy *= -1
            this.y = window.innerHeight - this.size
        }
        if(this.x <= 0){
            this.vx *= -1
            this.x = 0
        }
        if(this.y <= 0){
            this.vy *= -1
            this.y = 0
        }
    }

    move() {
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }
}


function initBlobs() {
    const blobEls = document.querySelectorAll('.blob');
    const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

    let isAnimating = false;

    function update() {
        if (isAnimating) {
            blobs.forEach((blob) => {
                blob.update();
                blob.move();
            });
            requestAnimationFrame(update);
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const isVisible = entries.some((entry) => entry.isIntersecting);
            isAnimating = isVisible;
            if (isVisible) {
                update();
            }
        },
        { threshold: 0.5 } // Adjust the threshold as needed
    );

    blobEls.forEach((blobEl) => observer.observe(blobEl));
}

initBlobs();

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const citySearchInput = document.querySelector('.weather__search-form_input')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const weatherIcon = document.querySelector('.icon')
const tl = gsap.timeline({defaults: {duration: 2, ease: "power1.out"}})
tl.fromTo('.icon', {y: 0}, {y: -10, yoyo: true, repeat: -1})



const checkWeather = () => {
    citySearchInput.addEventListener('input', async (e)=>{
        const response = await fetch(`${URL}?q=${e.target.value}&appid=${API_KEY}`)
        const data = await response.json()

        city.innerHTML = data.name || ''
        temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) - 273 + '°C' : ''

        if(data && data.weather && data.weather[0] && data.weather[0].main) {
            weatherCondition()
        } else {
            weatherIcon.innerHTML = ""
        }

        function weatherCondition() {
            if(data.weather[0].main === 'Clouds'){
                weatherIcon.innerHTML = 'cloud'
            } else if(data.weather[0].main === 'Clear') {
                weatherIcon.innerHTML = 'sunny'
            } else if(data.weather[0].main === 'Rain') {
                weatherIcon.innerHTML = 'rainy'
            } else if(data.weather[0].main === 'Drizzle') {
                weatherIcon.innerHTML = 'partly_cloudy_day'
            } else if(data.weather[0].main === 'Mist') {
                weatherIcon.innerHTML = 'mist'
            } else if(data.weather[0].main === 'Snow') {
                weatherIcon.innerHTML = 'cloudy_snowing'
            }
        }
    })
}

checkWeather()

