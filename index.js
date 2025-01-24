document.addEventListener('DOMContentLoaded', () => {
    const headers = {
        'Accept': 'application/json'
    };

    const carrousselMovies = [
        "&i=tt0076759",  // Star Wars: Episode IV - A New Hope
        "&i=tt0080684",  // Star Wars: Episode V - The Empire Strikes Back
        "&i=tt0086190",  // Star Wars: Episode VI - Return of the Jedi
        "&i=tt0120915",  // Star Wars: Episode I - The Phantom Menace
        "&i=tt0121765",  // Star Wars: Episode II - Attack of the Clones
        "&i=tt0121766",  // Star Wars: Episode III - Revenge of the Sith
        "&i=tt2488496",  // Star Wars: Episode VII - The Force Awakens
        "&i=tt2527336",  // Star Wars: Episode VIII - The Last Jedi
        "&i=tt2527338"   // Star Wars: Episode IX - The Rise of Skywalker
    ];
    const body = document.querySelector('body');
    const boutton = document.querySelector('.bouttondark');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const movies2024Container = document.getElementById('movies2024');

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

    async function tendancyMovieDetails(movie) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4${movie}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) throw new Error('Erreur de chargement des données');
            const data = await response.json();

            if (data.Poster) {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                slide.innerHTML = `
                    <img src="${data.Poster}" alt="${data.Title}">
                    <div>${data.Title}</div>
                `;

                swiperWrapper.appendChild(slide); 
                
                slide.addEventListener('click', () => {
                    window.location.href = `movie.html?movieId=${data.imdbID}`;
                });
            }

        } catch (error) {
            console.error(error);
            alert('Impossible de charger les données.');
        }
    }

    carrousselMovies.forEach(movie => tendancyMovieDetails(movie));

    setTimeout(() => {
        new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 1000,
        });
    }, 1000);

    async function fetchMovies2024() {
        const movies2024 = [
            "&i=tt30217143",  // Trouble
            "&i=tt11097384",  // Spaceman
            "&i=tt32281647",  // Elevation
            "&i=tt15314262",  // The Beekeeper
            "&i=tt32373672",  // L'Heureuse Élue
            "&i=tt4978420",  // Borderlands
            "&i=tt15552142",  // Caddo Lake
            "&i=tt24807110",  // Don't Move
            "&i=tt10128846"   // Megalopolis
        ];

        try {
            for (const movie of movies2024) {
                const response = await fetch(`https://www.omdbapi.com/?apikey=929ff8b4${movie}`);
                if (!response.ok) throw new Error('Erreur de chargement des données');

                const data = await response.json();
                displayMovies2024(data);
            }
        } catch (error) {
            console.error(error);
            alert('Impossible de charger les données.');
        }
    }

    function displayMovies2024(movie) {
        if (movie.Poster) {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            movieElement.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div>${movie.Title} (${movie.Year})</div>
            `;
            movies2024Container.appendChild(movieElement);
            
            movieElement.addEventListener('click', () => {
                window.location.href = `movie.html?movieId=${movie.imdbID}`;
            });
        }
    }

    fetchMovies2024();
});