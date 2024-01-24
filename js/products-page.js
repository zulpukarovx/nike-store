const productsContainer = document.querySelector('.products')

const renderProducts = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '../product-list.json')
    request.setRequestHeader('Content-type', 'application/json')
    request.send()

    request.onload = () => {
        const data = JSON.parse(request.response)

        data.forEach((product) => {
            const card = document.createElement('div')
            card.setAttribute('class', 'product__card')

            card.innerHTML = `
               <div class="card__photo">
                   <a href="#">
                       <img src="${product.photo}" alt="jordan gratitude">
                   </a>
               </div>
               <div class="card__desc">
                   <div class="card__desc-name">
                       <a href="#">
                           <span>${product.name}</span>
                       </a>
                   </div>
                   <div class="card__desc-category">
                       <span>${product.category}</span>
                   </div>
                   <div class="card__desc-price">
                       <span>${product.price}</span>
                   </div>
               </div>
            `
            productsContainer.append(card)
        })
    }
}

renderProducts()