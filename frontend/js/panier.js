//variable productInLocalStorage dans laquelle on met les keys et les values qui sont dans le local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

/*----------------------------------affichage des produits du panier----------------------------------*/
const displayBasket = document.querySelector("#container_panier");

// si le panier est vide
if (productInLocalStorage === null || productInLocalStorage == 0) {
  const basketEmpty = `
    <div class ="container_panier_vide">
        <div>Votre panier est tristement vide. </div>
    </div>
    `;
  displayBasket.innerHTML = basketEmpty;
} else {
  let productBasket = [];

  for (j = 0; j < productInLocalStorage.length; j++) {
    productBasket =
      productBasket +
      `
      <div class="container_panier_resume">
        <div class="container_panier_resume_details">Quantité 1 - ${productInLocalStorage[j].nomProduit}  Option : ${productInLocalStorage[j].option_Produit}</div>
        <div class="container_panier_resume_price">Prix : ${productInLocalStorage[j].price}€</div>
        <button class="btn_supprimer"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>`;
  }
  if (j === productInLocalStorage.length) {
    displayBasket.innerHTML = productBasket;
  }
}

/*----------------------------------gestion de l'icone supprimer l'article----------------------------------*/
let btnSupp = document.querySelectorAll(".btn_supprimer");

for (let k = 0; k < btnSupp.length; k++) {
  btnSupp[k].addEventListener("click", (Event) => {
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

/*-----------------------------------Montant total du panier-----------------------------------*/
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
displayBasket.insertAdjacentHTML("beforeend", affichagePrice);

/*-----------------------------------ecouter le btn envoyer formulaire-----------------------------------*/
const btnEnvoyerFormulaire = document.querySelector("#envoyer_formulaire");
btnEnvoyerFormulaire.addEventListener("click", (Element) => {
  Element.preventDefault();
  //recuperation des valeurs du formulaire
  const valeursForm = {
    firstName: document.querySelector("#name").value,
    lastName: document.querySelector("#last_name").value,
    address: document.querySelector("#adresse").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#email").value,
  };

  /*-----------------------------------validation du form-----------------------------------*/
  const regExPrenomNomVille =(value)=>{
    return /^[A-Za-z]{3,20}$/.test(value)

  };
  const regExAdresseEmail =(value)=>{
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);

  };
  function controlPrenom() {
    // controle de la validation du prenom avec RegExs.
    const theName = valeursForm.firstName;
    if (regExPrenomNomVille(theName)) {
      return true;
    } else {
      return false;
    }
  }
  function controlNom() {
    // controle de la validation du nom avec RegExs.
    const theLastName = valeursForm.lastName;
    if (regExPrenomNomVille(theLastName)) {
      return true;
    } else {
      return false;
    }
  }
  function controlEmail() {
    // controle de la validation de l'email avec RegExs.
    const theEmail = valeursForm.email;
    console.log(theEmail);
    if (regExAdresseEmail(theEmail)) {
      return true;
    } else {
      return false;
    }
  }
  /*----------------------------------- si le formulaire est bon le mettre dans le local storage-----------------------------------*/
  if (controlPrenom() && controlNom() && controlEmail()) {
    localStorage.setItem("valeursForm", JSON.stringify(valeursForm));
    localStorage.setItem("prixTotal", JSON.stringify(priceTotal));
    /*-----------------------------------infos à envoyer vers le serveur-----------------------------------*/
    let productsIds = [];
    productInLocalStorage.forEach((productInLocalStorage) => {
      productsIds.push(productInLocalStorage.productId);
    });
    const order = {
      contact: {
        firstName: valeursForm.firstName,
        lastName: valeursForm.lastName,
        city: valeursForm.city,
        address: valeursForm.address,
        email: valeursForm.email,
      },
      products: productsIds,
    };
    /*-----------------------------------envoi vers le server-----------------------------------*/
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    };
    fetch(`http://localhost:3000/api/cameras/order`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        window.location = "confirmation.html";
      })

      .catch((error) => {
        alert("erreur" + error);
      });
  } else {
    document.querySelector("#erreur").textContent =
        "Tout les champs doivent etre correctement remplis avant d'envoyer le formulaire  notamment : prenom,  nom et ville : pas de caractères spéciaux ";
  }
});
