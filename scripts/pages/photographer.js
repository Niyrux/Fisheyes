async function getPhotographerById(id) {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const photographer = data.photographers.find(p => p.id == id);
        const media = data.media.filter(m => m.photographerId == id);

        return photographer ? { photographer, media } : null;

    } catch (error) {
        console.error("Error fetching the photographer:", error);
    }
}

async function displayPhotographerDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const data = await getPhotographerById(id);
    if (!data) return;

    const { photographer, media } = data;

    /* =========================
       HEADER PHOTOGRAPHE
    ========================= */
    const name = document.createElement('h2');
    name.textContent = photographer.name;
    document.querySelector('.name-header').appendChild(name);
    const infoPhotographer = document.getElementById('info-photographer');
    let namePhotographer = document.createElement('h2')
    namePhotographer.textContent =photographer.name;
    let country = document.createElement('p') 
    country.className ='city';
    country.textContent = photographer.city + ', ' + photographer.country;
    let tagline = document.createElement('p')
    tagline.className = 'tagline'
    tagline.textContent = photographer.tagline;
    infoPhotographer.appendChild(namePhotographer);
    infoPhotographer.appendChild(country);
    infoPhotographer.appendChild(tagline);

    const imgPhotographer = document.getElementById('img-photographer');
    let image_photographer = document.createElement('img');
    image_photographer.src = 'assets/photographers/' + photographer.portrait
    imgPhotographer.appendChild(image_photographer)
    console.log(photographer)
    /* =========================
       SECTION MEDIA
    ========================= */
    const detailsSection = document.getElementById('photographer-details');
    const mediaSection = document.createElement('section');
    mediaSection.id = 'photographer-media';
    detailsSection.appendChild(mediaSection);

    let totalLikes = media.reduce((sum, m) => sum + m.likes, 0);
    let currentMediaList = [...media];

    /* =========================
       RENDER MEDIA
    ========================= */
    function renderMedia(mediaList) {
        mediaSection.innerHTML = '';

        mediaList.forEach(media => {
            const mediaElement = document.createElement('div');
            mediaElement.className = 'media';

            if (media.image) {
                const img = document.createElement('img');
                img.src = 'assets/photographers/' + media.image;
                img.alt = media.title;
                img.dataset.id = media.id;
                mediaElement.appendChild(img);
            } else {
                const video = document.createElement('video');
                video.src = 'assets/photographers/' + media.video;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.dataset.id = media.id;
                mediaElement.appendChild(video);
            }

            const details = document.createElement('div');
            details.className = 'details';

            const title = document.createElement('p');
            title.textContent = media.title;

            const like = document.createElement('div');
            like.className = 'like';

            const numberLike = document.createElement('p');
            numberLike.textContent = media.likes;

            const heart = document.createElement('img');
            heart.src = 'assets/heart.png';

            let hasLiked = false;
            like.addEventListener('click', () => {
                if (!hasLiked) {
                    media.likes++;
                    numberLike.textContent = media.likes;
                    totalLikes++;
                    totalLike.textContent = totalLikes;
                    hasLiked = true;
                }
            });

            like.appendChild(numberLike);
            like.appendChild(heart);

            details.appendChild(title);
            details.appendChild(like);

            mediaElement.appendChild(details);
            mediaSection.appendChild(mediaElement);
        });
    }

    /* =========================
       CARROUSEL
    ========================= */
    function createCarrousel(mediaList, startId) {
        const overlay = document.createElement('div');
        overlay.className = 'carrousel-overlay';
        overlay.innerHTML = `
            <div class="carrousel">
                <button class="prev-btn"><img src="assets/prev.png"></button>
                <div class="carrousel-content"></div>
                <button class="next-btn"><img src="assets/next.png"></button>
            </div>
            <button class="close-btn"><img src="assets/close.png"></button>
        `;
        document.body.appendChild(overlay);

        const content = overlay.querySelector('.carrousel-content');
        const items = [];

        mediaList.forEach(media => {
            const item = document.createElement('div');
            item.className = 'carrousel-item';

            const title = document.createElement('p');
            title.textContent = media.title;
            item.appendChild(title);

            if (media.image) {
                const img = document.createElement('img');
                img.src = 'assets/photographers/' + media.image;
                item.appendChild(img);
            } else {
                const video = document.createElement('video');
                video.src = 'assets/photographers/' + media.video;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                item.appendChild(video);
            }

            content.appendChild(item);
            items.push(item);
        });

        let currentIndex = mediaList.findIndex(m => m.id == startId);

        function update() {
            items.forEach((item, i) =>
                item.classList.toggle('active', i === currentIndex)
            );
        }

        update();

        overlay.querySelector('.prev-btn').onclick = () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            update();
        };

        overlay.querySelector('.next-btn').onclick = () => {
            currentIndex = (currentIndex + 1) % items.length;
            update();
        };

        overlay.querySelector('.close-btn').onclick = () => {
            document.body.removeChild(overlay);
        };

        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'ArrowLeft') overlay.querySelector('.prev-btn').click();
            if (e.key === 'ArrowRight') overlay.querySelector('.next-btn').click();
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
                document.removeEventListener('keydown', handler);
            }
        });
    }

    mediaSection.addEventListener('click', (e) => {
        if ((e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') && e.target.dataset.id) {
            createCarrousel(currentMediaList, e.target.dataset.id);
        }
    });
    /* =========================
       SELECT
    ========================= */

const selectBtn = document.getElementById('selectBtn');
const optionsMenu = document.getElementById('optionsMenu');
const options = document.querySelectorAll('.option');
const hiddenSelect = document.getElementById('sort');

selectBtn.addEventListener('click', () => {
  const isOpen = selectBtn.classList.toggle('open');
  optionsMenu.classList.toggle('open');
  
  selectBtn.setAttribute('aria-expanded', isOpen);
});

options.forEach(option => {
  option.addEventListener('click', () => {
    const value = option.dataset.value;
    const text = option.textContent;
    const optionId = option.id;

    selectBtn.textContent = text;
    hiddenSelect.value = value;

    options.forEach(opt => {
      opt.classList.remove('selected');
      opt.setAttribute('aria-selected', 'false');
    });
    option.classList.add('selected');
    option.setAttribute('aria-selected', 'true');

    optionsMenu.setAttribute('aria-activedescendant', optionId);

    selectBtn.classList.remove('open');
    optionsMenu.classList.remove('open');
    selectBtn.setAttribute('aria-expanded', 'false');

    hiddenSelect.dispatchEvent(new Event('change'));
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-select')) {
    selectBtn.classList.remove('open');
    optionsMenu.classList.remove('open');
    selectBtn.setAttribute('aria-expanded', 'false');
  }
});
    /* =========================
       TRI
    ========================= */
    const sortSelect = document.getElementById('sort');
    console.log(sortSelect)
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentMediaList = [...media];

            switch (e.target.value) {
                case 'popularity':
                    currentMediaList.sort((a, b) => b.likes - a.likes);
                    break;
                case 'date':
                    currentMediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'title':
                    currentMediaList.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }

            renderMedia(currentMediaList);
        });
    }

    /* =========================
       FOOTER INFOS
    ========================= */
    const info = document.createElement('div');
    info.className = 'rightDown';

    const price = document.createElement('div');
    price.textContent = photographer.price + '€ / jour';

    const likeBox = document.createElement('div');
    const totalLike = document.createElement('div');
    totalLike.textContent = totalLikes;

    const heart = document.createElement('img');
    heart.src = 'assets/black-heart.png';

    likeBox.appendChild(totalLike);
    likeBox.appendChild(heart);

    info.appendChild(price);
    info.appendChild(likeBox);
    detailsSection.appendChild(info);

    /* =========================
       INIT
    ========================= */
    renderMedia(currentMediaList);
}

displayPhotographerDetails();
