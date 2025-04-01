const accessKey = "crFeNmB17Vey0ljik49WR8hAuIYyw-C6erWAONgrP7c";

async function fetchRandomImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=mountains&client_id=${accessKey}`);
        const data = await response.json();

        // Skapa en ny bild för att ladda den i bakgrunden
        const img = new Image();
        img.src = data.urls.full;

        // När bilden är färdigladdad, sätt den som bakgrundsbild
        img.onload = () => {
            document.body.style.backgroundImage = `url(${data.urls.full})`;

            // Spara bildens URL i localStorage
            localStorage.setItem("backgroundImage", data.urls.full);
        };
    } catch (error) {
        console.error("Fel vid hämtning av bild...", error);
    }
}

// Lägg till event listener för knappen
document.getElementById("randomBtn").addEventListener("click", fetchRandomImage);

// Ladda bakgrundsbild från localStorage vid sidladdning
const savedImage = localStorage.getItem("backgroundImage");
if (savedImage) {
    document.body.style.backgroundImage = `url(${savedImage})`;
} else {
    fetchRandomImage(); // Hämta en ny bild om ingen är sparad
}