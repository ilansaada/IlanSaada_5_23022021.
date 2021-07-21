// recup l'id du server dans le loal storage

const orderId = localStorage.getItem("orderId");
const prixTotal = localStorage.getItem("prixTotal");
console.log(`prixtotal : ${prixTotal}`)
const structurConfirmationCommande = `
<h2>Votre commande</h2>
<div class="container_confirmation_commande_details">
    <div>numero de commande : ${orderId}</div>
    <div>montant total :${prixTotal}€</div>
</div>`;
const positionConfirmationCommande  = document.querySelector("#container_confirmation");
positionConfirmationCommande.insertAdjacentHTML("afterbegin", structurConfirmationCommande); 

function SuppLocalStorage(key){
    localStorage.removeItem(key)
}
SuppLocalStorage("prixTotal");
SuppLocalStorage("orderId");
SuppLocalStorage("product");
SuppLocalStorage("valeursForm");

