const modal = document.querySelector('.modal')
const modalTriggerButton = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')
let modalOpened = false

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    modalOpened = true
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTriggerButton.onclick = () => {
    openModal()
}

closeModalButton.onclick = () => {
    closeModal()
}

modal.onclick = (e) => {
    if (e.target === modal) {
        closeModal()
    }
}

window.addEventListener('scroll', openModalOnScrollBottom)
modal.addEventListener('mouseover', () => {
    window.removeEventListener('scroll', openModalOnScrollBottom)
})

function openModalOnScrollBottom() {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        openModal()
        modalOpened = true
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        if (modalOpened === false) {
            openModal()
        }
    }, 30000)
})

//mamp

const formElement = document.querySelector('form')

// const postData = (url, data) => {
//     return fetch(url, {
//         method: "POST",
//         headers: {'Content-type' : 'application/json'},
//         body: data
//     })
// }
//
// const bindPostData = (form) => {
//     form.onsubmit = (e) => {
//         e.preventDefault()
//
//         const formData = new FormData(form)
//         const user = {}
//         formData.forEach((item, index) => user[index] = item)
//         const json = JSON.stringify(user)
//         postData('server.php', json)
//     }
// }
//
// bindPostData(formElement)

const gmailInput = document.querySelector('.modal_input')
const verifierBtn = document.querySelector('.btn_dark')
const gmailResult = document.querySelector('.gmail-result')

const regExp = /\w{6,30}@gmail.com/

verifierBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let html = ''

    if (!gmailInput.value) {
        html = `Please insert your email`
    } else if (regExp.test(gmailInput.value)) {
        html = `Email is correct and subscribed`
        gmailInput.value = ''
    } else {
        html = `Email username is incorrect :(`
        gmailInput.value = ''
    }
    gmailResult.innerHTML = html
})