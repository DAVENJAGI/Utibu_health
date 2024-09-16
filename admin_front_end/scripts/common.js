//This script handles routing around the website's pages

function logOut(){
  localStorage.clear();
  window.location.href = "landing_page.html"; // Redirect to login page
}

function routeHome() {
  window.location.href = "home.html";
}

function routeRegions() {
  window.location.href = "regions.html";
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

function hideExpiredSessionDiv() {
  const showSessionExpired = document.getElementById('session_expired');
  showSessionExpired.style.display = 'none';
  logOut();
}

console.log('Functions running succesfuly!!');

const customToken = localStorage.getItem('X-Custom-Token');
function getAuthHeaders() {
  return {
    'X-Custom-Token': customToken
  };
}

function showOverlay() {
  const overlayDiv = document.getElementById('overlay');
  const computedStyle = window.getComputedStyle(overlayDiv);

  if (computedStyle.display === 'none') {
    overlayDiv.style.display = 'block';
  }
}

function hideOverlayy() {
  const overlayDiv = document.getElementById('overlay');
  const computedStyle = window.getComputedStyle(overlayDiv);

  if (computedStyle.display === 'block') {
    overlayDiv.style.display = 'none';
  }
}
function fetchData() {
  fetch(`http://0.0.0.0:5000/api/v1/status`, {
    headers: getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.error("Error fetching admin data", response.statusText);
    }
  })
  .then(data => {
    const showApi = document.getElementById('status_color');
    if (data.status === 'OK') { 
      showApi.style.backgroundColor = "#008000";
      showApi.style.border = "#008000";
    } else {
      showApi.style.backgroundColor = "red";
      showApi.style.border = "red";
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    const showApi = document.getElementById('status_color');
    const expiredSession = document.getElementById('session_expired');
    const overlayDiv = document.getElementById('overlay');
    showApi.style.backgroundColor = "red";
    showApi.style.border = "red";
    expiredSession.style.visibility = "visible";
    showOverlay();
    overlayDiv.style.zIndex = "250";
    expiredSession.style.zIndex = "800";
  });
}
fetchData();
const intervalId = setInterval(fetchData, 10000);
