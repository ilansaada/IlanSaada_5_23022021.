//appel à l'API fetch avec la méthode globale fetch() afin de récupérer des ressources à travers le réseau de manière asynchrone.
let mainContainer = document.querySelector(".container");

fetch("http://localhost:3000/api/cameras")
  .then((data) => data.json())
  .then((jsonListProduct) => {
    for (let jsonProduct of jsonListProduct) {
      let product = new Product(jsonProduct);
      mainContainer.innerHTML += `<div class="product">
                <a href="produit.html?id=${product._id}"><img src="${
        product.imageUrl
      }"alt=""></a>
                <div class="details">
                    <h4>${product.name}</h4>
                    <div class="description">
                        <p>${product.description}</p>
                        <p>${product.price / 100}€</p>
                    </div>
                </div>
            </div>`;
    }
  })
  .catch((error) => {
    mainContainer.innerHTML = `<div class = container_error>
        <p>l'erreur suivante a été remontée : ${error}</p>
      </div>`;
  });
