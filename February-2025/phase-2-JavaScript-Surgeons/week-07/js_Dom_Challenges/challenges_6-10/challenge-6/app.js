function updateClock() {
    // Digital Clock
    const digitalClock = document.querySelector(".digital-clock");
    const date = document.querySelector(".date");
    //  console.log("digitalClock: ",digitalClock);
    //  console.log("date: ",date);


    const currentDate = new Date();
    const hours = currentDate.getHours() % 12 || 12;
    const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    const seconds = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : currentDate.getSeconds();
    const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    //    console.log(`${hours}:${minutes}:${seconds}:${ampm}`)


    digitalClock.innerText = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}:${ampm}`;
    date.innerText = currentDate.toLocaleDateString(undefined, options);

    // Analog Clock
    const hourHand = document.querySelector(".hand.hour");
    const minuteHand = document.querySelector(".hand.minute");
    const secondHand = document.querySelector(".hand.second");

    const hoursRotation = ((hours % 12) * 30) + (minutes * 0.5);
    const minutesRotation = (minutes * 6) + (seconds * 0.1)
    const secondRotation = (seconds * 6)

    hourHand.style.transform = `translateX(-50%) rotate(${hoursRotation}deg)`
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesRotation}deg)`
    secondHand.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`
}

setInterval(updateClock, 1000);
updateClock()


const clock = document.querySelector(".clock");



for (let i = 1; i <= 12; i++) {
    const number = document.createElement("div");
    number.className = "number"
    number.style.setProperty("--rotation", `${i * 30}deg`);
    const span = document.createElement("span");
    span.innerText = i;
    number.appendChild(span)
    clock.appendChild(number)
}