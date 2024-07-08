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
            if (data.message === 'Login sucessful') {
                window.location.href = 'home.html'; 
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        });
    });
});
/*
export function storeUserData(userData) {
    console.log("Storing user data", userData);

}
window.storeUserData = storeUserData;*/