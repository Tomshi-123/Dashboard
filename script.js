function updateClockAndDate() {
    const now = new Date();

    // Formatera datum som siffror (YYYY-MM-DD)
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Månader är 0-indexerade
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Formatera tid (HH:MM:SS)
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


//SNABBLÄNKSFUNKTIONER
function createCard(url, name) {
    const cardContainer = document.getElementById('cardContainer');

    // Skapa kortet som en div
    const card = document.createElement('div');
    card.className = 'card';

    // Skapa en länk för loggan
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // Öppna länken i en ny flik

    const img = document.createElement('img');
    img.src = `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
    img.alt = `${name} logo`;
    link.appendChild(img); // Lägg till bilden i länken

    const text = document.createElement('span');
    text.className = 'cardText'; 
    text.textContent = name;

    // Skapa en knapp för att ta bort kortet
    const removeButton = document.createElement('button');
    removeButton.className = 'removeButton';
    removeButton.textContent = '×'; // Kryss-symbol
    removeButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Förhindra att klicket på knappen triggar länken
        card.remove();

        // Ta bort kortet från localStorage
        const links = JSON.parse(localStorage.getItem('links')) || [];
        const updatedLinks = links.filter(link => link.url !== url);
        localStorage.setItem('links', JSON.stringify(updatedLinks));
    });

    // Lägg till länken, texten och knappen i kortet
    card.appendChild(link); // Loggan är klickbar
    card.appendChild(text);
    card.appendChild(removeButton);

    // Lägg till kortet i cardContainer
    cardContainer.appendChild(card);
}

//Funktion för lägga till länk-knappen 

document.getElementById('addLinkButton').addEventListener('click', function AddLinkClick() 
{
    const input = document.getElementById('linkInput');
    const name = input.value.trim();

    if (!name) {
        alert('Skriv en gilting hemsida');
        return;
    }

    const url = name.startsWith('http') ? name : `https://${name}.com`;

    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ url, name });
    localStorage.setItem('links', JSON.stringify(links));

    createCard(url, name);

    input.value = '';
})


//funktion för att spara länkarna i localStorage

function loadLinks() {
    const cardContainer = document.getElementById('cardContainer');
    const links = JSON.parse(localStorage.getItem('links')) || []; // Hämta länkar från localStorage

    // Rensa tidigare kort i cardContainer
    cardContainer.innerHTML = '';

    // Skapa ett kort för varje länk
    links.forEach(link => {
        createCard(link.url, link.name); // Använd createCard för att skapa kort
    });
}


loadLinks();



//WEATHER

