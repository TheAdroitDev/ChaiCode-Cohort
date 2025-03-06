/**
 * Write your challenge solution here
 */
const mainButton = document.querySelector('.toggle-btn')
const panel = document.querySelector('.panel')
const closeBtn = document.querySelector('.close-btn')
const display = document.querySelector('body')
const menuItems = document.querySelectorAll('.menu-item')

mainButton.addEventListener('click', () => {
    panel.classList.toggle('active')
})
closeBtn.addEventListener('click', () => {
    panel.classList.remove('active')
})
document.addEventListener('click', (event) => {
    if (!panel.contains(event.target) && !mainButton.contains(event.target)) {
        panel.classList.remove('active')
    }
})
menuItems.forEach((title) => {    
    title.addEventListener("click", () => {
        alert(`You clicked ${title.innerHTML}`)
    panel.classList.remove('active')

    })
})
