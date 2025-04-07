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
    card.appendChild(link); 
    card.appendChild(text);
    card.appendChild(removeButton);

    // Lägg till kortet i cardContainer
    cardContainer.appendChild(card);
}



// Funktion för lägga till länk-knappen
document.getElementById('addLinkButton').addEventListener('click', function AddLinkClick() {
    const input = document.getElementById('linkInput');
    const name = input.value.trim();

    if (!name) {
        alert('Skriv en giltig hemsida');
        return;
    }

    const url = name.startsWith('http') ? name : `https://${name}.com`;

    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ url, name });
    localStorage.setItem('links', JSON.stringify(links));

    createCard(url, name);

    input.value = '';
});

// Lägg till stöd för "Enter"-tangenten
document.getElementById('linkInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Förhindra att formuläret skickas (om det är ett formulär)
        document.getElementById('addLinkButton').click(); // Simulera ett klick på knappen
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const links = JSON.parse(localStorage.getItem('links')) || [];

    links.forEach(link => {
        createCard(link.url, link.name);
    });
});