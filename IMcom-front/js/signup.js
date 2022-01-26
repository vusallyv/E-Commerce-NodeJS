const Signup = {
    singupManager(email, password, name) {
        const url = `http://127.0.0.1:8080/auth/signup`;
        fetch(url, {
            method: 'POST',
            // credentials: 'include',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            body: JSON.stringify({
                'email': email,
                'password': password,
                'name': name,
            })
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = 'http://127.0.0.1:5500/IMcom-front/register.html';
            });
    }
}

const signup = document.getElementById('signup');
signup.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    Signup.singupManager(email, password, name);
});