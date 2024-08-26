//This script handles routing around the website's pages

function logOut(){
  window.location.href = "landing_page.html"; // Redirect to login page
}

function routeHome() {
  window.location.href = "home.html";
}

function routeRegions() {
  regionRoute = document.getElementById('regions');
  console.log('hello');
  regionRoute.document.addEventListener('click', () => {
    window.location.href = "regions.html";
  })
}

function routeHospitals() {
  window.location.href = "hospitals.html";
}

function routeDoctors() {
  window.location.href = "doctors.html";
}


function routePatients() {
  window.location.href = "patients.html";
}


function routeDiseases() {
  window.location.href = "diseases.html";
}


function routeMedications() {
  window.location.href = "medications.html";
}

function routeAppointments() {
  window.location.href = "appointments.html";
}


function routeOrders() {
  window.location.href = "orders.html";
}
    

function routePayments() {
  window.location.href = "payments.html";
}

function goBackToHospitals() {
  window.location.href = "hospitals.html";
}

function goBackToHospitals() {
  window.location.href = "hospitals.html";
}
function goBackToUser() {
  window.location.href = "patients.html";
}
function goBackToDoctor() {
  window.location.href = "doctors.html";
}
function goBackToAppoinment() {
  window.location.href = "appointments.html";
}
document.addEventListener('DOMContentLoaded', () => {
  routeRegions();
  goBackToAppoinment();
  goBackToDoctor();
  routeOrders();
  routeHospitals();
})

console.log('Functions running succesfuly!!');