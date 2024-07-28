document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/hospitals';
    const pageSize = 10;
    let currentPage = 1;
    let hospitalData = [];

    const tableBody = document.getElementById('myHospitalTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    // Function to fetch all counties data
    function fetchAllHospitals() {
        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                hospitalData = data; // Store all counties data
                displayCurrentPage(); // Display initial page
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }


    

    const searchInput = document.getElementById('search_input_home');
    const searchButton = document.getElementById('search_button_home');

    

    // Function to display hospital for the current page
    function displayCurrentPage() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageHospital = hospitalData.slice(startIndex, endIndex);

        // Clear existing table rows before adding new ones
        tableBody.innerHTML = '';

        // Loop through counties for the current page and populate table rows
        currentPageHospital.forEach(hospital => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox" id="checkbox-${hospital.id}"></td>
                <td>${hospital.id}</td>
                <td>${hospital.name}</td>
                <td>${hospital.email}</td>
                <td>${hospital.longitude}</td>
                <td>${hospital.latitude}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Update the page number displayed
        pageNumSpan.textContent = currentPage;

        // Disable buttons if on first or last page
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= hospitalData.length;
    }

    // Fetch all counties data when DOM is loaded
    fetchAllHospitals();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredHospitals = hospitalData.filter(hospital =>
            hospital.name.toLowerCase().includes(searchTerm) ||
            hospital.id.toLowerCase().includes(searchTerm) ||
            hospital.email.toLowerCase().includes(searchTerm)
        );

        tableBody.innerHTML = '';
        filteredHospitals.forEach(hospital => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox" id="checkbox-${hospital.id}"></td>
                <td>${hospital.id}</td>
                <td>${hospital.name}</td>
                <td>${hospital.email}</td>
                <td>${hospital.longitude}</td>
                <td>${hospital.latitude}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Clear search input
        searchInput.value = '';
    });

    // Add click event listeners for pagination buttons and increments them on clicking till there' no more data to append to table
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(hospitalData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;

        const clickedRow = event.target.parentNode;
        const hospitalId = clickedRow.cells[1].textContent;

        window.location.href = `hospital_info.html?hospitalId=${hospitalId}`;
    });

    //EVENT LISTENER TO CHANGE THE COLOR OF THE TEXT ON CLICKING THE CHECKBOX
    tableBody.addEventListener('click', (event) => {
      if (event.target.type === 'checkbox') {
          const checkbox = event.target;
          checkbox.parentElement.style.color = 'red';
          const checkboxId = checkbox.id;
          console.log('Clicked checkbox ID:', checkboxId);
          
          const hospitalId = checkbox.id.split('checkbox-')[1]; 
          const saveButton = document.getElementById('delete_yes_button');
          saveButton.addEventListener("click", function() {
              deleteHospital(hospitalId);
          });   
          
          const clickedRow = checkbox.closest('tr');
          clickedRow.style.color = checkbox.checked ? '#1a6860' : '';
          clickedRow.style.backgroundColor = checkbox.checked ? '#E2F3E6' : '';
      }
  });

  //FUNCTION THAT DELETES A USER
  function deleteHospital(hospitalId) {
      const deleteRequest = `http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`;
  
      fetch(deleteRequest, {
          method: "DELETE",
      })
      .then(response => {
          if (response.ok) {
              hideDeleteConfirmationDiv();
              return response.json();
          } else {
          console.error("Error deleting Hospital:", response.statusText);
      }
    })
    .then(jsonData => {
      showDeleteFeedbackDiv();
      console.log(jsonData);
      const deleteConfirmationTextDiv = document.getElementById('delete_saved_confirmation_text_text');
      deleteConfirmationTextDiv.textContent = jsonData.Message;
    })
    .catch(error => alert("Error sending request:", error));
  }



    // A FUNCTION TO ADD NEW HOSPITAL OBJECT TO IT.
const countySelect = document.getElementById("county_select");
const constituencySelect = document.getElementById("constituency_select");
const townSelect = document.getElementById("town_select");
const dropdownIcon = document.getElementById("dropdown_icon");

// Function to fetch counties data from the API endpoint
function fetchCounties() {
  fetch("http://0.0.0.0:5000/api/v1/counties")
    .then(response => response.json())
    .then(data => {
      data.forEach(county => {
        const option = document.createElement("option");
        option.value = county.id; 
        option.innerText = county.name;
        countySelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching counties:", error));
}
console.log('finished fetching counties')

// Function to fetch towns data based on the selected county
console.log('starting to fetch constituencies based on counties')
function fetchConstituencies(countyId) {
    fetch(`http://0.0.0.0:5000/api/v1/county/${countyId}/constituencies`)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Consts', data);
      constituencySelect.disabled = false; 
      constituencySelect.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Select Constituency";
      constituencySelect.appendChild(defaultOption);
      data.forEach(constituency => {
        const option = document.createElement("option");
        option.value = constituency.id;
        option.innerText = constituency.constituency_name;
        constituencySelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching constituencies:", error));
}
  console.log('Successfully fetched Constituencies');


console.log('Starting to fetch Wards');
function fetchTowns(constituencyId) {
  fetch(`http://0.0.0.0:5000/api/v1/constituency/${constituencyId}/wards`)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Wards', data);
      townSelect.disabled = false;
      townSelect.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Select Ward";
      townSelect.appendChild(defaultOption);
      data.forEach(town => {
        const option = document.createElement("option");
        option.value = town.id;
        option.innerText = town.town_name;
        townSelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching towns:", error));
}
console.log("finished fetching Wards");
fetchCounties();


countySelect.addEventListener("change", function() {
  const countyId = this.value;
  if (countyId) {
    fetchConstituencies(countyId);
  } else {
    constituencySelect.disabled = true;
    constituencySelect.innerHTML = ""; 
  }
});

constituencySelect.addEventListener("change", function() {
    const constituencyId = this.value;
    if (constituencyId) {
      fetchTowns(constituencyId);
    } else {
      townSelect.disabled = true; 
      townSelect.innerHTML = "";
    }
  });


});


function createNewHospital() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const townId = document.getElementById("town_select").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    
      // Validate form data (optional, add your own validation logic)
    if (!name || !email || !townId || !latitude || !longitude) {
      alert("Please fill out all required fields!");
      return;
    }
   
    const hospitalData = {
      town_id: townId,
      email: email,
      name: name,
      longitude: longitude,
      latitude: latitude,
    };
    
    const jsonData = JSON.stringify(hospitalData);
  
    const request = new Request("http://0.0.0.0:5000/api/v1/hospitals", {
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
}// createNewHospital();



function clearForm() {
  const form = document.getElementById("newHospitalForm");
  form.reset(); 
}

function hideNewHospital() {
  const newHospitalForm = document.getElementById("new_hospital");
  newHospitalForm.style.display = "none";
}

// FUNCTION TO HIDE AND SHOW THE ADD NEW HOSPITAL 
function showAddNewHospital() {
    const showAddNewForm = document.getElementById('new_hospital');
  
     
    if (showAddNewForm.style.display === 'none') {
      showAddNewForm.style.display = 'block';
    } else {
      showAddNewForm.style.display = 'none';
    }
}  window.onload = showAddNewHospital();
  

// FUNCTION THAT HIDES AND SHOWS CONFIRMATION DIV FOR CREATING NEW HOSPITAL
function showConfirmationDiv() {
  const confirmationDiv = document.getElementById('confirmation_div');

   
  if (confirmationDiv.style.display === 'none') {
    confirmationDiv.style.display = 'block';
  } else {
    confirmationDiv.style.display = 'none';
  }
} //window.onload = showConfirmationDiv();

//HIDES THE CONFIRMATION DIV ON BEING CALLED
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
  window.location.reload();
}


document.addEventListener("DOMContentLoaded", function() {
  showAddNewHospital();
  showConfirmationDiv();
  createNewHospital();
});


/*

const confirmationDiv = document.getElementById('confirmation_div');
const button1 = document.getElementById('exit_hospital_form_button');
const button2 = document.getElementById('save_button');

const disableButtons = () => {
  button1.disabled = true;
  button2.disabled = true;
};

const enableButtons = () => {
  button1.disabled = false;
  button2.disabled = false;
};

confirmationDiv.addEventListener('load', () => {

  if (confirmationDiv.style.display !== 'none') {
    disableButtons();
  }
});

const showConfirmationDiv = () => {
  confirmationDiv.style.display = 'block';
  disableButtons();
};
const hideConfirmationDiv = () => {
  confirmationDiv.style.display = 'none';
  enableButtons();
};
*/

function showDeleteConfirmationDiv() {
  const deleteConfirmationDiv = document.getElementById('delete_confirmation_div');
     
  if (deleteConfirmationDiv.style.display === 'none') {
    deleteConfirmationDiv.style.display = 'block';
  } else {
    deleteConfirmationDiv.style.display = 'block';
  }
}

function hideDeleteConfirmationDiv() {
  const deleteConfirmationDi = document.getElementById("delete_confirmation_div");
  deleteConfirmationDi.style.display = "none";
}

//FUNCTION TO SHOW THE DELETE FEEDBACK INFO DIV
function showDeleteFeedbackDiv() {
  const feedbackDiv = document.getElementById("delete_returned_info");
  feedbackDiv.style.display = "block";
}
//HIDES THE RETURNED MESSAGE FROM THE SERVER DIV ON ADDING A NEW HOSPITAL
function hideDeleteFeedbackDiv() {
  const feedbackDiv = document.getElementById("delete_returned_info");
  feedbackDiv.style.display = "none";
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", function() {
  showDeleteConfirmationDiv();
  showDeleteFeedbackDiv();
  showDeleteConfirmationDiv();
});