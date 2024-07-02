// DISPLAY AND HIDE THE ADD NEW HOSPITAL FORM
/*
function showAddNewHospital() {
  const showAddNewForm = document.getElementById('add_new');
  const hideNewForm = document.getElementById('exit_button');
    
  if (showAddNewForm.style.display === 'none') {
    showAddNewForm.style.display = 'block';
  } else {
    hideNewForm.style.display = 'none';
  }
} // window.onload = showAddNewHospital();
*/

function showAddNewHospital() {
  const showAddNewForm = document.getElementById('add_new');
  const hideNewForm = document.getElementById('exit_button');
   
  if (showAddNewForm.style.display === 'none') {
    showAddNewForm.style.display = 'block';
  } else {
    hideNewForm.style.display = 'none';
  }
} window.onload = showAddNewHospital();
  
  // Ensure the function runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    showAddNewHospital();
});
  