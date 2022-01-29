const fetchProduct = () => {
  const url = `http://127.0.0.1:8080/product/product/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      product = data.product;
      page_title = document.getElementById('page_title');
      if (product) {
        const productsDiv = document.getElementById('products');
        page_title.innerHTML = product.productId.title;
        productsDiv.innerHTML = `
                <div class="col-12">
                <div class="box">
                <div class="img-box">
                <img src="${product.image}" alt="">
                <a href="#" class="add_cart_btn" data-id="${product._id}">
                <span class="add-to-cart">
                Add To Cart
                </span>
                </a>
                </div>
                <div class="detail-box">
                <a href="?id=${product._id}" style="color: black;">
                <h5>
                ${product.description}
                </h5>
                </a>
                <div class="product_info">
                <h5>
                <span>$</span> ${product.productId.price}
                </h5>
                <div class="star_container">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
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
      view_more_btn = document.getElementById('view_more-btn');
      view_more_btn.innerHTML = '';
    });
};

const fetchProducts = () => {
  const url = 'http://127.0.0.1:8080/product/products';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productsDiv = document.getElementById('products');
      page_title = document.getElementById('page_title');
      page_title.innerHTML = 'Our Products';
      data.productVersions.forEach(product => {
        productsDiv.innerHTML += `
                <div class="col-sm-6 col-lg-4">
                <div class="box">
                  <div class="img-box">
                    <img src="${product.image}" alt="">
                    <a href="#" class="add_cart_btn" onclick="addToBasket(this)" data-id="${product._id}">
                      <span class="add-to-cart">
                        Add To Cart
                      </span>
                    </a>
                  </div>
                  <div class="detail-box">
                  <a href="?id=${product._id}" style="color: black;">
                    <h5>
                    ${product.productId.title}
                    </h5>
                  </a>
                  <div class="product_info">
                  <h5>
                  <span>$</span> ${product.productId.price}
                  </h5>
                  <div class="star_container">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>    
              `
      });
      view_more_btn = document.getElementById('view_more-btn');
      view_more_btn.innerHTML = `<a href="" class="view_more-link">
            View More
          </a>`;
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
  } else {
    fetchProducts();
  }
}    
