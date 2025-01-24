document.addEventListener('DOMContentLoaded', () => {
    const headers = {
        'Accept': 'application/json'
    };

    let h2 = document.querySelector('h2');

    async function movieDetails(movie) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4${movie}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) throw new Error('Erreur de chargement des données');
            const data = await response.json();

            if (data.Poster) {
                h2.textContent = data.Title;

                const slide = document.createElement('div');

                slide.innerHTML = `<img src="${data.Poster}" alt="${data.Title}">`;
            }

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