const urlParams = new URLSearchParams(window.location.search);
const hospitalId = urlParams.get('hospitalId');

document.addEventListener('DOMContentLoaded', () => {
  
  const customToken = localStorage.getItem('X-Custom-Token');
  function getAuthHeaders() {
    return {
      'X-Custom-Token': customToken
    };
  }


    const requestUrl = `http://0.0.0.0:5000/api/v1/hospital/${hospitalId}/doctors`; // Replace with your actual API endpoint
    const requestHospital = `http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`; 
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let doctorData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myDoctorTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');


    fetch(requestHospital, { headers: getAuthHeaders() })
        .then(response => response.json())
        .then(data => {
            console.log("API data:", data);
            
            const hospitalName = document.getElementById('name_data');
            const hospitalEmail = document.getElementById('hospital_email');
            const hospitalLogitude = document.getElementById('hosp_longitude');
            const hospitalLatitude = document.getElementById('hosp_latitude');
            
            
      
            hospitalName.textContent = data.name;
            hospitalEmail.textContent = data.email;
            hospitalLogitude.textContent = data.longitude;
            hospitalLatitude.textContent = data.latitude;

            const requestTown = `http://0.0.0.0:5000/api/v1/ward/${data.town_id}`;
            return fetch(requestTown, { headers: getAuthHeaders() });
        })
        .then(response => response.json())
        .then(townData => {
          console.log("Town API data:", townData);

          const hospitalTown = document.getElementById('town_name');
          hospitalTown.textContent = townData.town_name;

          const requestConstituency = `http://0.0.0.0:5000/api/v1/constituency/${townData.constituency_id}`;
          return fetch(requestConstituency, { headers: getAuthHeaders() });

        })
        .then(response => response.json())
        .then(constituencyData => {
          console.log("Constituency API data:", constituencyData);

          const hospitalConstituency = document.getElementById('const_name');
          hospitalConstituency.textContent = constituencyData.constituency_name;

          const requestCounty = `http://0.0.0.0:5000/api/v1/county/${constituencyData.county_id}`;
          return fetch(requestCounty, { headers: getAuthHeaders() });
        })
        .then(response => response.json())
        .then(countyData => {
          console.log("County API data:", countyData);

          const hospitalCounty = document.getElementById('county_name');
          hospitalCounty.textContent = countyData.name;
        })
        


        .catch(error => {
            console.error("Error fetching data:", error);
        });
    

    // Function to fetch all counties data
    function fetchAllDoctors() {
        fetch(requestUrl, { headers: getAuthHeaders() })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                doctorData = data;
                const doctorNumber = doctorData.length;
                const doctorInHospital = document.getElementById('dkt_num');
                doctorInHospital.textContent = doctorNumber;
                console.log(doctorNumber);
                displayCurrentPage();
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }


    

    

    // Function to display doctor for the current page
    function displayCurrentPage() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageDoctor = doctorData.slice(startIndex, endIndex);

        // Clear existing table rows before adding new ones
        tableBody.innerHTML = '';

        // Loop through counties for the current page and populate table rows
        currentPageDoctor.forEach(doctor => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${doctor.first_name}</td>
                <td>${doctor.last_name}</td>
                <td>${doctor.email}</td>
                <td>${doctor.license_no}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Update the page number displayed
        pageNumSpan.textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= doctorData.length;
    }

    fetchAllDoctors();


    const searchInput = document.getElementById('search_input_home');
    const searchButton = document.getElementById('search_button_home');



    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter counties data based on search term
        const filteredDoctors = doctorData.filter(doctor =>
            doctor.first_name.toLowerCase().includes(searchTerm) ||
            doctor.last_name.toLowerCase().includes(searchTerm) ||
            doctor.license_no.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredDoctors.forEach(doctor => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${doctor.first_name}</td>
                <td>${doctor.last_name}</td>
                <td>${doctor.email}</td>
                <td>${doctor.license_no}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Clear search input
        searchInput.value = '';
    });
    

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(doctorData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });




/*A FUNCTION THAT CREATES NEW DOCTOR */
  function createNewDoctor() {

    // event.preventDefault();
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const licenseNumber = document.getElementById("license_no").value;
    if (!validateForm(firstName, email, password, lastName, licenseNumber)) {
      return;
    }
    
    
    const doctorData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      license_no: licenseNumber,
      hospital_id: hospitalId,
    };
    
    const jsonData = JSON.stringify(doctorData);

    const request = new Request("http://0.0.0.0:5000/api/v1/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    
    fetch(request)
      .then(response => {
        if (response.ok) {
          hideConfirmationDiv();
          return response.json();
        } else {
          console.error("Error saving hospital:", response.statusText);
          // Handle error message
        }
      })
      .then(jsonData => {
        showFeedbackDiv();
        console.log(jsonData);
        const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
        confirmationTextDiv.textContent = jsonData.Message;
      })
      .catch(error => alert("Error sending request:", error));
  }
  
  function validateForm(firstName, lastName, email, password, licenseNumber) {
    if (!firstName || !lastName || !email || !password || !licenseNumber) {
        alert("Please fill out all required fields!");
        return false;
    }
    return true;
  }

  document.getElementById("newDoctorForm").addEventListener("submit", function(event) {
    createNewDoctor(event);
  });

const saveButton = document.getElementById('yes_button');

  saveButton.addEventListener("click", function() {
    createNewDoctor();
  });

});

function clearForm() {
  const form = document.getElementById("newDoctorForm");
  form.reset();
  }
  //
  function hideNewDoctor() {
  const newDoctorForm = document.getElementById("new_doctor");
  newDoctorForm.style.display = "none"; // Hides the form element
  }

function showAddNewDoctor() {
  const showAddNewForm = document.getElementById('new_doctor');
 
     
  if (showAddNewForm.style.display === 'none') {
    showAddNewForm.style.display = 'block';
  } else {
    showAddNewForm.style.display = 'none';
  }
} window.onload = showAddNewDoctor();

// SHOWS CONFIRMATION DIV
function showConfirmationDiv() {
  const confirmationDiv = document.getElementById('confirmation_div');

   
  if (confirmationDiv.style.display === 'none') {
    confirmationDiv.style.display = 'block';
  } else {
    confirmationDiv.style.display = 'none';
  }
} window.onload = showConfirmationDiv();

function hideConfirmationDiv() {
  const confirmationDiv = document.getElementById("confirmation_div");
  confirmationDiv.style.display = "none";
}

// FUNCTION TO DISPLAY THE DIV
function showFeedbackDiv() {
  const feedbackDiv = document.getElementById("returned_info");
  feedbackDiv.style.display = "block";
}
//HIDES THE RETURNED MESSAGE FROM THE SERVER DIV ON ADDING A NEW HOSPITAL
function hideFeedbackDiv() {
  const feedbackDiv = document.getElementById("returned_info");
  feedbackDiv.style.display = "none";
  clearForm();
}


document.addEventListener("DOMContentLoaded", function() {
  showAddNewDoctor();
  hideNewDoctor();
  showConfirmationDiv();
});