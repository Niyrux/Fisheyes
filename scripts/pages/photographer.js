async function getPhotographerById(id) {
    try {
        const response = await fetch('./data/photographers.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
       
        const photographer = data.photographers.find(p => p.id == id); 
        const media = data.media.filter(m=> m.photographerId == id)
        if (photographer) {
            return { photographer, media }; 
        }
    } catch (error) {
        console.error("Error fetching the photographer:", error);
    }
}

async function displayPhotographerDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); 
    if (id) {
        const photographer = await getPhotographerById(id);

        if (photographer) {
            const detailsSection = document.getElementById('photographer-details');
            
           
            
            const mediaSection = document.createElement('section');
            mediaSection.id = 'photographer-media';
            detailsSection.appendChild(mediaSection);

            photographer.media.forEach(media => {
                const mediaElement = document.createElement('div');
                const details = document.createElement('div');
                details.className='details'
                mediaElement.className = 'media';
                const img = document.createElement('img');
                const video = document.createElement('video')

                    if(media.image){
                        img.setAttribute('src', 'assets/photographers/' + media.image );
                        img.setAttribute('alt', media.title);
                    }else if(media.video){
                        video.src= 'assets/photographers/' + media.video;
                        video.autoplay = true;

                    } else {

                    }
                  
                   
                const like = document.createElement('div');
                const numberLike = document.createElement('p');
                numberLike.textContent=media.likes
                const title = document.createElement('p');
                title.textContent = media.title;
                mediaElement.appendChild(details);    
                mediaElement.appendChild(img);
                mediaElement.appendChild(video)
                details.appendChild(title);
                details.appendChild(like);
                like.appendChild(numberLike);
                mediaSection.appendChild(mediaElement);
            });
        } 
    }
}

displayPhotographerDetails();
