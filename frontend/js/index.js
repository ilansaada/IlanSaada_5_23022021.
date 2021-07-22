//appel à l'API fetch avec la méthode globale fetch() afin de récupérer des ressources à travers le réseau de manière asynchrone.
fetch("http://localhost:3000/api/cameras")
  .then((data) => data.json())
  .then((jsonListProduct) => {
    for (let jsonProduct of jsonListProduct) {
      let product = new Product(jsonProduct);
      document.querySelector(".container").innerHTML += `<div class="product">
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
    document.querySelector(
      ".container"
    ).innerHTML = `<div class = container_error>
        Nous n'avons pas réussi à afficher nos cameras. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.
      </div>`;
  });
