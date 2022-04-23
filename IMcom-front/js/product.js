const fetchProduct = () => {
    const url = `http://127.0.0.1:8080/product/product/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            product = data.product;
            // page_title = document.getElementById('page_title');
            if (product) {
                const single_product = document.getElementById('single-product');
                // page_title.innerHTML = product.productId.title;
                single_product.innerHTML = `
                <div class="container py-5">
                <div class="row justify-content-center">
                  <div class="col-md-8 col-lg-6 col-xl-4">
                    <div class="card" style="border-radius: 15px;">
                      <div
                        class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="${product.image}"
                          style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                          class="img-fluid"
                          alt="${product.image}"
                        />
                        <a href="#!">
                          <div class="mask"></div>
                        </a>
                      </div>
                      <div class="card-body pb-0">
                        <div class="d-flex justify-content-between">
                          <div>
                            <p><a href="#!" class="text-dark">${product.productId.title}</a></p>
                            <p class="small text-muted">${product.productId.brand}</p>
                          </div>
                          <div>
                            <div class="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                            </div>
                            <p class="small text-muted">Rated 4.0/5</p>
                          </div>
                        </div>
                      </div>
                      <hr class="my-0" />
                      <div class="card-body pb-0">
                        <div class="d-flex justify-content-between">
                          <p><a href="#!" class="text-dark">$${product.productId.price}</a></p>
                          <p class="text-dark">#### 8787</p>
                        </div>
                        <p class="small text-muted">${product.description}</p>
                      </div>
                      <hr class="my-0" />
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                          <button type="button" class="btn btn-danger">Wishlist</button>
                          <button type="button" onclick="addToBasket(this)" data-id="${product._id}" class="btn btn-primary">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>    
                  `
            }
            else {
                page_title.innerHTML = 'Product Not Found';
            }
            // view_more_btn = document.getElementById('view_more-btn');
            // view_more_btn.innerHTML = '';
        });
};

window.addEventListener('load', selectFetch(location.href));

function selectFetch(url) {
    params = url.split('?')[1];
    if (params && params.includes('id=')) {
        params.split('&').forEach(param => {
            if (param.includes('id=')) {
                id = param.split('=')[1];
                fetchProduct();
            }
        });
    }
}  