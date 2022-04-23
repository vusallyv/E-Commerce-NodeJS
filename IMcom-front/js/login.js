const Login = {
    loginManager(email, password) {
        const url = `http://127.0.0.1:8080/auth/login`;
        fetch(url, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    window.location.href = 'http://127.0.0.1:5500/IMcom-front/index.html';
                }
            });
    }
}

const login = document.getElementById('login');
login.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    Login.loginManager(email, password);
});