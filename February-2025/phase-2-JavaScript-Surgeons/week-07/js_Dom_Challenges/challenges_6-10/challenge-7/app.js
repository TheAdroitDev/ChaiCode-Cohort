/**
 * Write your challenge solution here
 */
const accordionButtons = document.querySelectorAll(".accordion-button");
const accordionContent = document.querySelectorAll(".accordion-content")
const accordionItems = document.querySelectorAll(".accordion-item")
let currentAccordion = -1
accordionButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (currentAccordion === index) {
            accordionContent[index].style.maxHeight = "0";
            accordionItems[index].classList.remove('active');
        }
        else {
            if (currentAccordion !== -1) {
                accordionContent[currentAccordion].style.maxHeight = "0";
                accordionItems[currentAccordion].classList.add('active');
            }
            accordionContent[index].style.maxHeight = accordionContent[index].scrollHeight + "px";
            accordionItems[index].classList.add('active');
            currentAccordion = index
        }
    })
})