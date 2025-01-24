document.addEventListener('DOMContentLoaded', () => {
    const headers = {
        'Accept': 'application/json'
    };
    const searchInput = document.getElementById('searchInput');
    const resultat = document.getElementById('results');
    let moviesData = [];

    searchInput.addEventListener('input', async () => {
        console.log('test');
        const query = searchInput.value.trim().toLowerCase();
        const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4&s=${query}`, {
            method: 'GET',
            headers: headers
        });
        const data = await response.json();
        displayResults(data);
    });

    function displayResults(movies) {
        resultat.innerHTML = '';
        if (movies.Search) {
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
