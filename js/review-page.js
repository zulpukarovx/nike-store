const userImg = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'
const reviewsContainer = document.querySelector('.reviews__container')

const renderReviews = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`)
        }

        const data = await response.json()
        const fiftyItems = data.slice(0, 50)

        fiftyItems.forEach((item) => {
            const review = document.createElement('div')
            review.className = "review-item"
            review.innerHTML = `
                <div class="review__user-icon">
                    <img src="${userImg}" alt="User Icon">  
                </div>
                <div class="review__item-content">
                    <h4 class="review__title">${item.title}</h4>
                    <p class="review__text">${item.body}</p>
                </div>
            `
            reviewsContainer.append(review)
        })
    } catch (error) {
        console.error('Error fetching and rendering reviews:', error)
    }
}

renderReviews()
