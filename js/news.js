document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '58adfd06e3124339bd98c4c5a122f05a'; // Din API-nyckel från NewsAPI
    const newsContainer = document.getElementById('news-container'); // Hitta elementet där nyheterna ska visas

    // Funktion för att hämta nyheter från NewsAPI via GET
    function fetchNews() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxyserver för att kringgå CORS
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        // Gör en GET-förfrågan via proxyservern
        fetch(proxyUrl + url)
            .then(response => {
                // Kontrollera om svaret är ok (status 200-299)
                if (!response.ok) {
                    throw new Error('Det gick inte att hämta nyheterna. Försök igen senare.');
                }
                return response.json();
            })
            .then(data => {
                // Kontrollera om vi har artiklar i svaret
                if (data.articles && data.articles.length > 0) {
                    displayNews(data.articles);
                } else {
                    newsContainer.innerHTML = "<p>No news available at the moment.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                newsContainer.innerHTML = `<p>Failed to load news. Error: ${error.message}</p>`;
            });
    }

    // Funktion för att visa nyheterna på sidan
    function displayNews(articles) {
        newsContainer.innerHTML = ''; // Rensa tidigare nyheter
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');

            articleElement.innerHTML = `
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <img src="${article.urlToImage || 'default-image.jpg'}" alt="Article image" class="article-image">
            `;

            newsContainer.appendChild(articleElement);
        });
    }

    // Anropa funktionen för att hämta nyheter när sidan laddas
    fetchNews();
});