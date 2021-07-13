//variable productInLocalStorage dans laquelle on met les keyset les values qui sont dans le local storage
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

//affichage des produits du panier
const affichagePannier = document.querySelector("#container_panier");

            
// si le panier est vide
if(productInLocalStorage === null){
    const panierVide = `
    <div class ="container_panier_vide">
        <div>Votre panier est tristement vide </div>
    </div>
    `;
    affichagePannier.innerHTML = panierVide;
}else {
    let produitPanier = [];

    
    for (j = 0; j < productInLocalStorage.length; j++ ) {
        produitPanier = 
            produitPanier + 
            `
        <div class="container_panier_resume">
            <div class="container_panier_resume_details">Quantité 1 - ${productInLocalStorage[j].nomProduit} Option :${productInLocalStorage[j].option_Produit}</div>
            <div class="container_panier_resume_price">Prix -${productInLocalStorage[j].price}€</div>
        </div>
        `;
    }
    if(j === productInLocalStorage.length){ 
        affichagePannier.innerHTML = produitPanier; 
    }
}
        