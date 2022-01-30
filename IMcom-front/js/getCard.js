const fetchCard = () => {
    const url = `http://127.0.0.1:8080/card/cards`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            userId: localStorage.getItem('userId')
        }
    })
        .then(response => response.json())
        .then(data => {
            cart_products = document.getElementById('cart-products');
            item_count = document.getElementById('item-count');
            item_count.innerHTML = data.card.productVersions.length;
            data.card.productVersions.forEach(productVersion => {
                cart_products.innerHTML += `
                <div class="row">
                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                  <!-- Image -->
                  <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                    <img src="${productVersion.productVersionId.image}"
                      class="w-100" alt="${productVersion.productVersionId.productId.title}" />
                    <a href="#!">
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                    </a>
                  </div>
                  <!-- Image -->
                </div>
  
                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                  <!-- Data -->
                  <p><strong>${productVersion.productVersionId.productId.title}</strong></p>
                  <p>Color: ${productVersion.productVersionId.color}</p>
                  <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                    title="Remove item">
                    <i class="fa fa-trash"></i>
                  </button>
                  <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                    title="Move to the wish list">
                    <i class="fa fa-heart"></i>
                  </button>
                  <!-- Data -->
                </div>
  
                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <!-- Quantity -->
                  <div class="d-flex mb-4" style="max-width: 300px">
                    <button class="btn btn-primary px-3 me-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                      <i class="fa fa-minus"></i>
                    </button>
  
                    <div class="form-outline">
                      <input id="form2" min="0" name="quantity" value="${productVersion.quantity}" type="number" class="form-control" />
                      <label class="form-label" for="form2">Quantity</label>
                    </div>
  
                    <button class="btn btn-primary px-3 ms-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                  <!-- Quantity -->
  
                  <!-- Price -->
                  <p class="text-start text-md-center">
                    <strong>${productVersion.productVersionId.productId.price}</strong>
                  </p>
                  <!-- Price -->
                </div>
              </div>
              <hr class="my-4" />  
              `
            });
        });
};

window.addEventListener('load', fetchCard());