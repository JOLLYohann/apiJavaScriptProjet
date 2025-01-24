document.addEventListener('DOMContentLoaded', () => {
    const headers = {
        'Accept': 'application/json'
    };
    const boutton = document.querySelector('.bouttondark');

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

    let h2 = document.querySelector('h2');
    const movieInformations = document.querySelector('.movie-informations');

    async function movieDetails(movie) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4${movie}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) throw new Error('Erreur de chargement des données');
            const data = await response.json();

            const information = document.createElement('div');
            const poster = document.createElement('div');
            information.classList.add('movie-informations');
            poster.classList.add('movie-informations');

            h2.textContent = data.Title;
            poster.innerHTML = `<img src="${data.Poster}" alt="${data.Title}">`;
            information.innerHTML =
            `<p>Résumé: <br> ${data.Plot} <br></p>
            <p>Durée: ${data.Runtime}</p>
            <p>Année de sortie: ${data.Year}</p>
            <p>Genre: ${data.Genre}</p>
            <p>Acteurs: ${data.Actors}</p>
            <p>Réalisateur: ${data.Director}</p>
            <p>Auteur: ${data.Writer}</p>
            <p>Note: ${data.Metascore}%</p>`;
            movieInformations.appendChild(poster);
            movieInformations.appendChild(information);

        } catch (error) {
            console.error(error);
            alert('Impossible de charger les données.');
        }
    }

    function movieSelect() {
        const movieSelect = new URLSearchParams(window.location.search);
        const movieID = `&i=${movieSelect.get('movieId')}`;
        movieDetails(movieID);
    }

    movieSelect();

});