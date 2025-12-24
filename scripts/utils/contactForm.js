function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function getData() {
    const form = document.getElementById("form");

    form.addEventListener('submit', (event) => {
        event.preventDefault();


        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        console.log("Prénom :", firstName);
        console.log("Nom :", lastName);
        console.log("Email :", email);
        console.log("Message :", message);
        closeModal()
    });
}
getData();
