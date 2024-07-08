async function displayGreetings() {

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
        greeting = greetings.night;
      }
      greetingsElement.style.fontSize = '25px';
    
    
      if (greetingsElement) {
        greetingsElement.textContent = `${greeting}, `; 
      } else {
        console.log(`${greeting}, Dave`);
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
} window.onload = showDropdownDiv();

