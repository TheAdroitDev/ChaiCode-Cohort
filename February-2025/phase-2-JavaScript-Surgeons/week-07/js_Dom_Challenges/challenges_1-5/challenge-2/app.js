/**
 * Write your challenge solution here
 */

const mainTarget = document.getElementById('mainHeading');
const redButton = document.getElementById('redButton');
const greenButton = document.getElementById('greenButton');
const blueButton = document.getElementById('blueButton');
const purpleButton = document.getElementById('purpleButton');
const resetButton = document.getElementById('resetButton');
document. querySelector
resetButton.addEventListener('click',()=>{
    mainTarget.style.color = '#34495e';
})
redButton.addEventListener('click',()=>{
    mainTarget.style.color = '#e74c3c';
})
greenButton.addEventListener('click',()=>{
    mainTarget.style.color = '#2ecc71';
})
blueButton.addEventListener('click',()=>{
    mainTarget.style.color = '#3498db';
})
purpleButton.addEventListener('click',()=>{
    mainTarget.style.color = '#9b59b6';
})