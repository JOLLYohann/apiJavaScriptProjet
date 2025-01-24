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
                displayResults(data);
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
        if (movies.Search.length > 0) {
            movies.Search.forEach((movie) => {
                const movieFind = document.createElement('div');
                const movieElement = document.createElement('div');
                movieElement.classList.add('movieElement');

                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <div>${movie.Title} (${movie.Year})</div>
                `;
                
                movieFind.appendChild(movieElement);
                resultat.appendChild(movieFind);
                
                movieFind.addEventListener('click', () => {
                    window.location.href = `movie.html?movieId=${movie.imdbID}`;
                });
            });
        } else {
            resultat.innerHTML = '<p>Aucun résultat pour votre recherche.</p>';
        }
    }
});
