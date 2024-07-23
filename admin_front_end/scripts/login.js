document.addEventListener('DOMContentLoaded', () => {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginButton = document.getElementById("login_button");

    const passwordEntry = document.getElementById('password');
    const emailEntry = document.getElementById('email');
    
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
    
        const request = new Request("http://0.0.0.0:5000/api/v1/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        });
        
        fetch(request)
        .then(response => response.json())
        .then(data => {
            console.log('cheers, here is the data:', data.last_name);
            if (data.message === 'Login sucessful') {
                window.location.href = 'home.html'; 
            } else {
                data.message === 'Invalid password';
                passwordEntry.style.border = '1px solid red';
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        });
    });
});
