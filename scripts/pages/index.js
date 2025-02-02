async function getPhotographers() {
    try {
        const response = await fetch('./data/photographers.json');
        
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            
        }
        
      
        const data = await response.json();
        
        return data.photographers; 
    } catch (error) {
        console.error("Error fetching the data:", error);
        return [];
    }
}

async function displayData() {
    const photographers = await getPhotographers();
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    await displayData(); 
}

init();