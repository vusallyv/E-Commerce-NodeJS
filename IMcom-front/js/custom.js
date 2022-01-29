// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


user_option = document.getElementById('user_option');

if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    user_option.innerHTML = `
    <a href="" class="account-link">
                <i class="fa fa-user" aria-hidden="true"></i>
                <span>
                  My Account
                </span>
              </a>
              <a href="cart.html" class="cart-link">
              <span id="cart-count" class="badge badge-pill bg-danger">1</span>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>
                  Cart
                </span>
              </a>
              <a href="#" class="logout-link" onclick="logout()">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <span>
                  Logout
                </span>
              </a>`
} else {
    user_option.innerHTML = `
    <a href="login.html" class="login-link">
                <i class="fa fa-sign-in" aria-hidden="true"></i>
                <span>
                  Login
                </span>
              </a>
              <a href="signup.html" class="signup-link">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <span>
                  Signup
                </span>
              </a>
              `
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = 'http://127.0.0.1:5500/IMcom-front/login.html'
}

function setCartCount(data) {
    cart_count = document.getElementById('cart-count');
    count = 0;
    data.card.productVersions.forEach(productVersion => {
        count += productVersion.quantity;
    });
    cart_count.innerText = count;
}