//variable productInLocalStorage dans laquelle on met les keys et les values qui sont dans le local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

//affichage des produits du panier
const affichagePannier = document.querySelector("#container_panier");

// si le panier est vide
if (productInLocalStorage === null || productInLocalStorage == 0) {
  const panierVide = `
    <div class ="container_panier_vide">
        <div>Votre panier est tristement vide. </div>
    </div>
    `;
  affichagePannier.innerHTML = panierVide;
} else {
  let produitPanier = [];

  for (j = 0; j < productInLocalStorage.length; j++) {
    produitPanier =
      produitPanier +
      `
      <div class="container_panier_resume">
        <div class="container_panier_resume_details">Quantité 1 - ${productInLocalStorage[j].nomProduit}  Option : ${productInLocalStorage[j].option_Produit} id : ${productInLocalStorage[j].productId}</div>
        <div class="container_panier_resume_price">Prix : ${productInLocalStorage[j].price}€</div>
        <button class="btn_supprimer"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>`;
  }
  if (j === productInLocalStorage.length) {
    affichagePannier.innerHTML = produitPanier;
  }
}

//gestion de l'icone supprimer l'article
//selection des btn supprimer
let btn_supprimer = document.querySelectorAll(".btn_supprimer");

for (let k = 0; k < btn_supprimer.length; k++) {
  btn_supprimer[k].addEventListener("click", (Event) => {
    Event.preventDefault();
    //sélection de l'id du produit qui sera supprimer
    let id_suppression = productInLocalStorage[k].nomProduit;
    //avec filter
    productInLocalStorage = productInLocalStorage.filter(
      (el) => el.nomProduit !== id_suppression
    );
    //supprimer dans le local storage
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    //alert suppression afin de rafraichir la page
    alert("Votre produit va etre supprimé du panier");
    window.location.href = "panier.html";
  });
}

//Montant total du panier
let priceTotalCalcul = [];
//chercher les prix dans le panier
for (let l = 0; l < productInLocalStorage.length; l++) {
  let priceInPanier = productInLocalStorage[l].price;
  priceTotalCalcul.push(priceInPanier);
}
//additionner avec méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const priceTotal = priceTotalCalcul.reduce(reducer, 0);

//Html du prix total
const affichagePrice = `<div class="total_commande">
  Le prix total de votre commande est de :  ${priceTotal} €
</div>`;
affichagePannier.insertAdjacentHTML("beforeend", affichagePrice);

//Formulaire
const affichageformulairePannier = () => {
  const affichageForm = document.querySelector("#container_panier");
  const structureformulaire = `<div id="formulaire_commande">
  <h2>Formulaire à remplir pour la commande</h2> 
  <form>
    <label for="name">Prénom</label><span id="champManquant" class"champsManquants"></span>
    <input type="text" id="name" name="name" required> 
    
    <label for="last_name">Nom</label>
    <input type="text" id="last_name" name="last_name" required> 
    
    <label for="adresse">Adresse</label>
    <textarea id="adresse" name="adresse" required></textarea>
    
    <label for="ville">Ville</label>
    <input type="text" id="ville" name="ville" required> 
    
    <label for="email">E-mail</label>
    <input type="text" id="email" name="email" required> 
    <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Confirmation de la commande</button>
    </form>
</div>`;
  affichageForm.insertAdjacentHTML("afterend", structureformulaire);
};
//affichage du formulaire
affichageformulairePannier();
//selection du btn envoyer formulaire
const btnEnvoyerFormulaire = document.querySelector("#envoyer_formulaire");
//ecouter le btn envoyer formulaire
btnEnvoyerFormulaire.addEventListener("click", (Element) => {
  Element.preventDefault();
  //recuperation des valeurs du form
  const valeursForm = {
    firstName: document.querySelector("#name").value,
    lastName: document.querySelector("#last_name").value,
    address: document.querySelector("#adresse").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#email").value,
  };

  //validation du form
  function controlPrenom() {
    // controle de la validation du prenom
    const theName = valeursForm.firstName;
    if (/^[A-Za-z]{3,20}$/.test(theName)){
      return true;
    } else {
      alert("erreur dans les informations saisies");
      document.querySelector("#champManquant").textContent = "Veuillez remplir correctement ce champ avant d'envoyer le formulaire";
      return false;
    }
  }
  if (controlPrenom()) {
    //mettre dans le local storage
    localStorage.setItem("valeursForm", JSON.stringify(valeursForm));
  } else {
    alert("Veuillez bien remplir le formulaire");
  }
  const productsId = productInLocalStorage[productId];
  // infos à envoyer vers le serveur
  const order = {
    contact:{
      firstName:valeursForm.firstName,
      lastName:valeursForm.lastName,
      city:valeursForm.city,
      address:valeursForm.address,
      email:valeursForm.email,
    },
    productsId: productsId,
  };
  console.log(order);
  //envoi vers le server
  const promise01 = fetch("http://localhost:3000/api/cameras/order",{
    method: "POST",
    body: JSON.stringify(order),
    headers:{
      "content-Type": "application/json",
    },
    
  });
  

});
