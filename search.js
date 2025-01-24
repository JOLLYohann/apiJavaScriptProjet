document.addEventListener('DOMContentLoaded', () => {
    const headers = {
        'Accept': 'application/json'
    };
    const boutton = document.querySelector('.bouttondark');
    const searchInput = document.getElementById('searchInput');
    const moreButton = document.querySelector('.moreButton');
    const resultat = document.getElementById('results');
    var pageCount = 1;

    function toggleDarkMode() {
        if (body.classList.contains('light')) {
            body.classList.add('dark');
            body.classList.remove('light');
            boutton.textContent = "Activer le mode clair";
        } else {
            body.classList.add('light');
            body.classList.remove('dark');
            boutton.textContent = "Activer le mode sombre";
        }
    }

    boutton.addEventListener('click', toggleDarkMode);

    async function searchMovie(pageNumber) {
        console.log(pageNumber);
        console.log('test');
        const query = searchInput.value.trim().toLowerCase();
        const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4&s=${query}&page=${pageNumber}`, {
            method: 'GET',
            headers: headers
        });
        const data = await response.json();
        displayResults(data);
    };

    function newSearch() {
        pageCount = 1;
        console.log(pageCount);
        searchMovie(pageCount);
    }

    function moreMovie() {
        console.log(pageCount);
        pageCount = pageCount+1 ;
        searchMovie(pageCount);
    }

    searchInput.addEventListener('input', newSearch);
    moreButton.addEventListener('click', moreMovie);

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
