//currency converter

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

// const converter = (element, targetElement, targetElementTwo, currentValue) => {
//     element.addEventListener('input', () => {
//         const request = new XMLHttpRequest()
//         request.open('GET', '../currency.json')
//         request.setRequestHeader('Content-type', 'application/json')
//         request.send()
//
//         request.onload = () => {
//             const response = JSON.parse(request.response)
//             switch (currentValue) {
//                 case 'som':
//                     targetElement.value = (element.value / response.usd).toFixed(2)
//                     targetElementTwo.value = (element.value / response.eur).toFixed(2)
//                     break
//                 case 'usd':
//                     targetElement.value = (element.value * response.usd).toFixed(2)
//                     targetElementTwo.value = (targetElement.value / response.eur).toFixed(2)
//                     break
//                 case 'eur':
//                     targetElement.value = (element.value * response.eur).toFixed(2)
//                     targetElementTwo.value = (targetElement.value / response.usd).toFixed(2)
//                     break
//                 default:
//                     break
//             }
//             if(element.value === '') {
//                 targetElement.value = ''
//                 targetElementTwo.value = ''
//             }
//         }
//     })
// }

const converter = (element, targetElement, targetElementTwo, currentValue) => {
    element.addEventListener('input', async () => {
        try {
            const response = await fetch('../currency.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            switch (currentValue) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElementTwo.value = (element.value / data.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    targetElementTwo.value = (targetElement.value / data.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    targetElementTwo.value = (targetElement.value / data.usd).toFixed(2)
                    break
                default:
                    break
            }

            if (element.value === '') {
                [targetElement.value, targetElementTwo.value] = ['', '']
            }
        } catch (error) {
            console.error('Error converting currency:', error)
        }
    });
};

converter(somInput, usdInput, eurInput, 'som')
converter(usdInput, somInput, eurInput, 'usd')
converter(eurInput, somInput, usdInput, 'eur')