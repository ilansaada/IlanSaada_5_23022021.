//récupération de la chaine de requette dans l'url
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
//Afin d'extraire l'id
const id = urlSearchParams.get("id");
fetch(`http://localhost:3000/api/cameras/${id}`)
  .then((data) => data.json())
  .then((product) => {
    document.querySelector(".container").innerHTML += `<div class="product">
                <img src="${product.imageUrl}"alt="">
                <div class="details">
                    <h4>${product.name}</h4>
                    <div class="description">
                        <p>${product.description}</p>
                        <p>${product.price / 100}€</p>
                    </div>
                </div>
                <form>
                    <label for="optionproduit">Choix de Focales : </label>
                    <select name="option_produit" id="option_produit">
                        <option value="${product.lenses[0]}">${
      product.lenses[0]
    }</option>
                        <option value="${product.lenses[1]}">${
      product.lenses[1]
    }</option>
                    </select>
                </form>
                <button id="btn" type="submit">Ajouter au panier</button>
            </div>`;
    //le panier
    //récuperation des données séléctionnées par l'utilisateur
    //récuperations des valeurs du formulaire

    //selection du btn
    const btn_envoyer = document.querySelector("#btn");
    //ecouter le btn
    btn_envoyer.addEventListener("click", (event) => {
      event.preventDefault();
      //séléction de l'id du formulaire
      const idForm = document.querySelector("#option_produit");
      //mise du choix de l'utilisateur dans une variable
      const choiceUser = idForm.value;
      let optionProduit = {
        nomProduit: product.name,
        option_Produit: choiceUser,
        quantite: 1,
        price: product.price / 100,
        productId: id,
      };
      //le local storage
      //variable productInLocalStorage dans laquelle on met les keys et les values qui sont dans le local storage
      let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
      //fonction popup pour le client
      const popupconfirmation = () => {
        if (
          window.confirm(
            `${product.name} option: ${choiceUser} a bien été ajouté OK pour consulter le pannier ou ANNULER pour continuer vos achats`
          )
        ) {
          window.location.href = "panier.html";
        } else {
          window.location.href = "index.html";
        }
      };
      // si deja des produits dans le localstorage
      if (productInLocalStorage) {
        productInLocalStorage.push(optionProduit);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        popupconfirmation();
      } else {
        productInLocalStorage = [];
        productInLocalStorage.push(optionProduit);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.log(productInLocalStorage);
        popupconfirmation();
      }
    });
  });
