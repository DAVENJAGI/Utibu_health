document.addEventListener('DOMContentLoaded', () => {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginButton = document.getElementById("login_button");

    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        const emailValue = email.value;
        const passwordValue = password.value;

        if (!emailValue || !passwordValue) {
            alert("Please fill out all required fields!");
            return;
        }

        const loginData = {
            email: emailValue,
            password: passwordValue,
        };
        
        const jsonData = JSON.stringify(loginData);

        fetch("http://0.0.0.0:5000/api/v1/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        })
        .then(response => {
            console.log('Response headers:', [...response.headers.entries()]);
            const customToken = response.headers.get('X-Custom-Token');
            if (customToken) {
                localStorage.setItem('X-Custom-Token', customToken);
                console.log('X-Custom-Token stored:', customToken);
            } else {
                console.log('X-Custom-Token not found in response');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            if (data.Message === 'Login sucessful') {
              window.location.href = 'home.html'; 
            } else {
                password.style.border = '1px solid red';
                alert(data.error || 'Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        });
    });

});
