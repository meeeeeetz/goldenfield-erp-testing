document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || 'Invalid username or password');
            return;
        }

        localStorage.setItem('goldenfield_auth_token', data.token);
        localStorage.setItem('goldenfield_user', JSON.stringify(data.user));
        window.location.href = '../main-landing-page/MainLandingPage.html';
    } catch (err) {
        alert('Login failed. Please try again.');
    }
});
