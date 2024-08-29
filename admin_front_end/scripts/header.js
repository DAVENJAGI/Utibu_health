async function displayGreetings() {

  const customToken = localStorage.getItem('X-Custom-Token');
  const admin_id = localStorage.getItem('id');
  function getAuthHeaders() {
    return {
      'X-Custom-Token': customToken
    };
  }

  const response = await fetch(`http://0.0.0.0:5000/api/v1/admin/${admin_id}`, {
    headers: getAuthHeaders()
  });

  if(!response.ok){
    console.error("Error fetching admin data", response.statusText);
    return;
  }

  const data = await response.json()
  const name = data.first_name;
  const email = data.email;
  const emailDiv = document.getElementById('admin_text');
  emailDiv.textContent = email;

    try {
    
        const greetingsElement = document.getElementById('greeting_text');
        const date = new Date();
        const hours = date.getHours();
      
        const greetings = {
          morning: "Good Morning",
          afternoon: "Good Afternoon",
          evening: "Good Evening"
        };
      
        let greeting = "";
        if (hours < 12) {
          greeting = greetings.morning;
        } else if (hours < 17) {
          greeting = greetings.afternoon;
        } else if (hours < 21) {
          greeting = greetings.evening;
        } else {
          greeting = greetings.evening;
        }
        greetingsElement.style.fontSize = '25px';
      
      
        if (greetingsElement) {
          greetingsElement.textContent = `${greeting}, ${name}`; 
        } else {
          console.log(`Hello, Dave`);
        }
      } catch(error) {
        console.log("error is: ", error);
      }
    }
    setInterval(displayGreetings, 3600000);
    window.onload = displayGreetings;
  

function showDropdownDiv() {
  const dropdownInfo = document.getElementById('dropdown_div');
  if (dropdownInfo.style.display === 'none') {
    dropdownInfo.style.display = 'block';
  } else {
    dropdownInfo.style.display = 'none';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  showDropdownDiv();
  displayGreetings();
})