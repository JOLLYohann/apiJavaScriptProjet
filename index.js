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

    async function getTendancyMovie(movie) {
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
            }

        } catch (error) {
            console.error(error);
            alert('Impossible de charger les données.');
        }
    }

    carrousselMovies.forEach(movie => getTendancyMovie(movie));

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
});