// Hämta element
const titleElement = document.getElementById('dashboardTitle');
const editButton = document.getElementById('editTitleButton');

// Ladda rubriken från localStorage vid sidladdning
function loadTitle() {
    const savedTitle = localStorage.getItem('dashboardTitle');
    if (savedTitle) {
        titleElement.textContent = savedTitle; // Sätt rubriken till den sparade titeln
    }
}

// Hantera klick på penna-ikonen
editButton.addEventListener('click', function () {
    const newTitle = prompt('Skriv en ny rubrik:', titleElement.textContent); // Visa en prompt med den nuvarande rubriken
    if (newTitle && newTitle.trim() !== '') {
        titleElement.textContent = newTitle; // Uppdatera rubriken
        localStorage.setItem('dashboardTitle', newTitle); // Spara den nya rubriken i localStorage
    }
});

// Kör funktionen för att ladda rubriken vid sidladdning
loadTitle();