function createClockNumbers() {
    const clock = document.querySelector(".clock");

    for (let i = 1; i <= 12; i++) {
        const numberElement = document.createElement("div");
        numberElement.classList.add("number");
        // rotation angle for the number
        const angle = (i * 30) * (Math.PI / 180);
        const radius = 125;
        const x = Math.cos(angle - Math.PI / 2) * radius;
        const y = Math.sin(angle - Math.PI / 2) * radius;
        // Position the number
        numberElement.style.transform = `translate(${x}px, ${y}px)`;
        numberElement.innerHTML = `<span>${i}</span>`;
        clock.appendChild(numberElement);
    }
}
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const hourDeg = (hours % 12) * 30 + (minutes / 2);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    document.querySelector(".hour").style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector(".minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector(".second").style.transform = `rotate(${secondDeg}deg)`;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    document.querySelector(".digital-clock").textContent = formattedTime;
    const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    document.querySelector(".date").textContent = now.toLocaleDateString(undefined, dateOptions)
}
createClockNumbers()
setInterval(updateClock, 1000)
updateClock()