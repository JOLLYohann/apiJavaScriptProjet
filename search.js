document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultat = document.getElementById('results');
    let moviesData = [];

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4&s=${query}`);
                if (!response.ok) throw new Error('Erreur de chargement des données');


const data = await response.json();
                moviesData = data.Search || [];
                displayResults(moviesData);
            } catch (error) {
                console.error(error);
                alert('Impossible de charger les données.');
            }
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const filteredMovies = moviesData.filter(movie => 
            movie.Title.toLowerCase().includes(query)
        );
        displayResults(filteredMovies);
    });

    function displayResults(movies) {
        resultat.innerHTML = '';
        if (movies.length > 0) {
            movies.forEach((movie) => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <div>${movie.Title} (${movie.Year})</div>
                `;
                resultat.appendChild(movieElement);
            });
        } else {
            resultat.innerHTML = '<p>Aucun résultat pour votre recherche.</p>';
        }
    }
});
