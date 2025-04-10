function updateClockAndDate() {
    const now = new Date();

    // Formatera datum som siffror 
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Månader är 0-indexerade
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Formatera tid 
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Uppdatera HTML
    document.getElementById('date').textContent = formattedDate;
    document.getElementById('clock').textContent = formattedTime;
}

// Uppdatera klockan och datumet varje sekund
setInterval(updateClockAndDate, 1000);

// Kör funktionen direkt vid sidladdning
updateClockAndDate();