/**
 * Write your challenge solution here
*/
const toggleButton = document.getElementById('toggleButton');
const buldStatus = document.getElementById('status');
const bulb = document.getElementById('bulb');

toggleButton.addEventListener('click',()=>{
    if(toggleButton.innerHTML === "Turn On"){
        document.body.classList.add("dark-mode")
        bulb.classList.remove("off")
        toggleButton.innerHTML = "Turn Off"  
        buldStatus.innerHTML = "Status: ON"      
    }
    else{
        bulb.classList.add("off")
        document.body.classList.remove("dark-mode")
        toggleButton.innerHTML = "Turn On"        
        buldStatus.innerHTML = "Status: OFF"      
    }
})
