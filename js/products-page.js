const productsContainer = document.querySelector('.products');

const renderProducts = async () => {
    try {
        const response = await fetch('../product-list.json')
        const data = await response.json()

        data.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product__card';
            card.innerHTML = `
                <div class="card__photo"><a href="#"><img src="${product.photo}" alt="${product.name}"></a></div>
                <div class="card__desc">
                    <div class="card__desc-name"><a href="#"><span>${product.name}</span></a></div>
                    <div class="card__desc-category"><span>${product.category}</span></div>
                    <div class="card__desc-price"><span>${product.price}</span></div>
                </div>
            `;
            productsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching or rendering products:', error)
    }
}

renderProducts()


