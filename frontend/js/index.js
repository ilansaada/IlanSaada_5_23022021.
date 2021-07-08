
fetch ("http://localhost:3000/api/cameras")
    .then( data => data.json())
    .then( jsonListProduct => {
        for(let jsonProduct of jsonListProduct){ 
            let product = new Product(jsonProduct); 
            document.querySelector(".container") .innerHTML +=  
            `<div class="product">
                <a href="produit.html"><img src="${product.imageUrl}" alt=""></a>
                <div class="details">
                    <h4>"${product.name}"</h4>
                    <div class="description">
                        <p>"${product.description}"</p>
                        <p>"${product.price}"</p>
                    </div>
                </div>
            </div>` 
        }

    })


 