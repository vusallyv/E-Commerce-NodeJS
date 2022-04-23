
const fetchProducts = () => {
  const url = 'http://127.0.0.1:8080/product/products';
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      skip: 0,
      limit: 1,
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
                  <a href="http://127.0.0.1:5500/IMcom-front/single-product.html?id=${product._id}" style="color: black;">
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

window.addEventListener('load', fetchProducts(location.href));
  
