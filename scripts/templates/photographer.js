function photographerTemplate(data) {
    const { name, portrait,city,country,tagline,price,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt",name)
        const h2 = document.createElement( 'h2' );
        h2.className="nomarge " + "name";
        h2.textContent = name;
        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`; 
        const p = document.createElement('p');
        p.className="nomarge " + "city";
        p.textContent = city + ',' + ' ' +country;
        const pTagline = document.createElement('p');
        pTagline.className="nomarge " + "tagline";
        pTagline.textContent = tagline
        const pPrice = document.createElement('p');
        pPrice.className="nomarge " + "price";
        pPrice.textContent = price+'€/jour';
        a.appendChild(article)
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(pTagline)
        article.appendChild(pPrice)
        
        console.log(h2)
        return (a);
    }
    return { name, picture,city,country,tagline,price,id, getUserCardDOM }
}