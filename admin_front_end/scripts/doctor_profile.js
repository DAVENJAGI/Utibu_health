document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const doctorId = urlParams.get('doctorId');
    
  
    const requestDoctor = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}`;
    const requestDoctorPatients = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}/patients`;
    const pageSize = 10;
    let currentPage = 1;
    let doctorData = [];
    
    // DOM elements
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');


    fetch(requestDoctor)
        .then(response => response.json())
        .then(data => {
            console.log("Doctor API data:", data);
            
            const firstName = document.getElementById('dkt_first_name');
            const lastName = document.getElementById('dkt_last_name');
            const userEmail = document.getElementById('dkt_email');
            const dateOfBirth = document.getElementById('hospital_assigned');
            const licenseNumber = document.getElementById('license_no');
            
      
            firstName.textContent = data.first_name;
            lastName.textContent = data.last_name
            userEmail.textContent = data.email;
            dateOfBirth.textContent = data.date_of_birth;
            licenseNumber.textContent = data.license_no;

            const requestHospital = `http://0.0.0.0:5000/api/v1/hospital/${data.hospital_id}`;
            return fetch(requestHospital);
        })
        .then(response => response.json())
        .then(hospitalData => {
          console.log("Doctor API data:", doctorData);
          const assignedHospital = document.getElementById('hospital_assigned');

          assignedHospital.textContent = hospitalData.name;

        })

        .catch(error => {
            console.error("Error fetching data:", error);
        });
    
        
    // STARTING TO FETCH USERS
    function fetchAllUsers() {
        fetch(requestDoctorPatients)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                userData = data; // Store all counties data
                displayCurrentPage(); // Display initial page
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }


    

    const searchInput = document.getElementById('search_input');
    const searchButton = document.getElementById('search_button');

    

    // Function to display docor for the current page
    function displayCurrentPage() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageUser = userData.slice(startIndex, endIndex);

        // Clear existing table rows before adding new ones
        tableBody.innerHTML = '';

        // Loop through counties for the current page and populate table rows
        currentPageUser.forEach(user => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td>${user.date_of_birth}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Update the page number displayed
        pageNumSpan.textContent = currentPage;

        // Disable buttons if on first or last page
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= userData.length;
    }

    // FETCHING ALL USERS WITH THAT NAME
    fetchAllUsers();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter counties data based on search term
        const filteredUsers = userData.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredUsers.forEach(user => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td>${user.date_of_birth}</td>
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

});

document.addEventListener('DOMContentLoaded', () => {
    const diseaseSelect = document.getElementById("disease_select");
    let diseaseId;

    // Function to fetch counties data from the API endpoint
    function fetchDiseases() {
    fetch("http://0.0.0.0:5000/api/v1/diseases")
    .then(response => response.json())
    .then(data => {
        console.log('Diseases fetched:', data);
        data.forEach(disease => {
            const option = document.createElement("option");
            option.value = disease.id; 
            option.innerText = disease.name;
            diseaseSelect.appendChild(option);
        });
        })
        .catch(error => console.error("Error fetching diseases:", error));
    }
    console.log('finished fetching diseases')
    fetchDiseases();

    diseaseSelect.addEventListener("change", function() {
        diseaseId = this.value;
    });



/*A FUNCTION THAT CREATES NEW DOCTOR */
function createNewPatient() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dateOfBirth = document.getElementById("date_of_birth").value;
        if (!validateForm(firstName, email, password, lastName, dateOfBirth)) {
      alert("Please fill out all required fields!");
      return;
    }
   
    const doctorData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      date_of_birth: dateOfBirth,
      doctor_id: doctorId,
      disease_id: diseaseId,
    };
    
    const jsonData = JSON.stringify(doctorData);
  
    const request = new Request("http://0.0.0.0:5000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    
    fetch(request)
      .then(response => {
        if (response.ok) {
          alert("New Patient saved successfully!");
          clearForm();
          hideNewPatient();
        } else {
          console.error("Error saving patient:", response.statusText);
          // Handle error message
        }
      })
      .catch(error => alert("Error sending request:", error));
  }
  function validateForm(firstName, lastName, email, password, dateOfBirth) {
    if (!firstName || !lastName || !email || !password || !dateOfBirth) {
        alert("Please fill out all required fields!");
        return false;
    }
    return true;
  }

  document.getElementById("newPatientForm").addEventListener("submit", function(event) {
    createNewPatient(event);
  });


  const saveButton = document.getElementById('save_button');

  saveButton.addEventListener("click", function() {
    createNewPatient();
    });


  // RESETS FORM 
  
  function clearForm() {
  const form = document.getElementById("newPatientForm"); // Assuming the form has this ID
  form.reset(); // Resets all form elements to their default values
  }
  //HIIDES HOSPITAL FORM ONSUCCESS
  function hideNewPatient() {
  const newPatientForm = document.getElementById("new_patient");
  newPatientForm.style.display = "none"; // Hides the form element
  }


});

function showAddNewPatient() {
  const showAddNewForm = document.getElementById('new_patient');
     
         
  if (showAddNewForm.style.display === 'none') {
    showAddNewForm.style.display = 'block';
  } else {
    showAddNewForm.style.display = 'none';
  }
}

function hideAddNewPatient() {
    const showAddNewForm = document.getElementById('new_patient');
       
           
    if (showAddNewForm.style.display === 'block') {
      showAddNewForm.style.display = 'none';
    }
}
  