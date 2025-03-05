/**
 * Write your challenge solution here
 */
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const ageInput = document.getElementById('ageInput');
const bioInput = document.getElementById('bioInput');

const nameDisplay = document.getElementById('nameDisplay');
const jobDisplay = document.getElementById('jobDisplay');
const ageDisplay = document.getElementById('ageDisplay');
const bioDisplay = document.getElementById('bioDisplay');

nameInput.addEventListener('input', () => {
    nameDisplay.innerHTML = nameInput.value
})
jobInput.addEventListener('input', () => {
    jobDisplay.innerHTML = jobInput.value
})
ageInput.addEventListener('input', () => {
    ageDisplay.innerHTML = ageInput.value
})
bioInput.addEventListener('input', () => {
    bioDisplay.innerHTML = bioInput.value
})