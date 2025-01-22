document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
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

    async function fetchData() {
        try {
            const response = await fetch('http://www.omdbapi.com/?s=batman&apikey=3228ed4d');
            if (!response.ok) throw new Error('Erreur de chargement des données');

            const data = await response.json();

            if (data.Search) {
                const swiperWrapper = document.querySelector('.swiper-wrapper');

                data.Search.forEach(movie => {
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');

                    slide.innerHTML = `
                        <img src="${movie.Pposter}" alt="${movie.Title}">
                        <div>${movie.Title}</div>
                    `;

                    swiperWrapper.appendChild(slide);
                });

                new Swiper('.swiper', {
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    speed: 1000,
                });
            }
        } catch (error) {
            console.error(error);
            alert('Impossible de charger les données.');
        }
    }

    fetchData();
});