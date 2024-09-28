document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/users';
    const pageSize = 10;
    let currentPage = 1;
    let userData = [];
    let columnUserId;

    // DOM elements
    const tableBody = document.getElementById('myPatientTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');
    let userId = null;

    function getAuthHeaders() {
      return {
          'X-Custom-Token': customToken
      };
    }

    function fetchAllUsers() {
        fetch(requestUrl, { headers: getAuthHeaders()})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                userData = data;
                displayCurrentPage(); 
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }


    

    const searchInput = document.getElementById('search_input_home');
    const searchButton = document.getElementById('search_button_home');

    

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
                <td><input type="checkbox" id="checkbox-${user.id}"></td>
                <td>${user.id}</td>
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

    // Fetch all counties data when DOM is loaded
    fetchAllUsers();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredUsers = userData.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.id.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredUsers.forEach(user => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox" id="checkbox-${user.id}"></td>
                <td>${user.id}</td>
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
        if (currentPage < Math.ceil(userData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });

    function fetchUserDetails(userId) {
        const userDetailsUrl = `http://0.0.0.0:5000/api/v1/user/${userId}`;
        return fetch(userDetailsUrl, { headers: getAuthHeaders() })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
    
    function fetchRelatedData(userId, doctorId) {
        console.log(userId);
        return Promise.all([
            fetch(`http://0.0.0.0:5000/api/v1/user/${userId}`, { headers: getAuthHeaders() }).then(response => response.json()),
            fetch(`http://0.0.0.0:5000/api/v1/doctor/${doctorId}`, { headers: getAuthHeaders() }).then(response => response.json()),
        ]);
    }
    
    //UPDATES USER PPROFILE DATA
    function updateUserStatusDiv(userDetails, userData, doctorData) {
        const userStatusDiv = document.getElementById('user_status_div');
        
        document.getElementById('user_id_id').textContent = `Patient Id: ${userDetails.id}`;
    
        const userNameElem = document.getElementById('first_name');
        userNameElem.textContent = userDetails.first_name || 'N/A';
        
        const userNameElem1 = document.getElementById('last_name');
        userNameElem1.textContent = userDetails.last_name || 'N/A';  
                
        const userDateOfBirth = document.getElementById('date_of_birth');
        userDateOfBirth.textContent = userDetails.date_of_birth;
        
        const userDescriptionElem = document.getElementById('user_email');
        userDescriptionElem.textContent = userDetails.email;
        
                
        const doctorNameElem = document.getElementById('doctor_name');
        doctorNameElem.textContent = `${doctorData.first_name} ${doctorData.last_name}`;
        
        const telephoneElem = document.getElementById('phone_number');
        telephoneElem.textContent = userDetails.telephone_no || 'N/A';

        const sexElem = document.getElementById('sex');
        sexElem.textContent = userDetails.sex || 'N/A';
        
        const addressElem = document.getElementById('patient_address');
        addressElem.textContent = userDetails.address || 'N/A';
        
        
    }

    // UPDATES USER EDIT PROFILE DATA
    function updateUserEditDiv(userDetails, userData, doctorData) {
        const userStatusDiv = document.getElementById('user_profile_edit');
        console.log(userDetails);
        console.log(userData.id);
        
        const headerText = document.getElementById('user_edit_id');
        headerText.textContent = `Patient Id: ${userData.id}`;
        
        const userNameElem = document.getElementById('edit_first_name');
        userNameElem.value = userData.first_name || 'N/A';
                
        const userNameElem1 = document.getElementById('edit_last_name');
        userNameElem1.value = userDetails.last_name || 'N/A';  
                
        const userDateOfBirth = document.getElementById('edit_date_of_birth');
        userDateOfBirth.value = userDetails.date_of_birth;
        
        const userDescriptionElem = document.getElementById('edit_user_email');
        userDescriptionElem.value = userDetails.email;
        
                
        const doctorNameElem = document.getElementById('edit_doctor_name');
        doctorNameElem.textContent = `${doctorData.first_name} ${doctorData.last_name}`;
        
        const telephoneElem = document.getElementById('edit_phone_number');
        telephoneElem.value = userDetails.telephone_no || 'N/A';

        const sexElem = document.getElementById('option_select_1');
        sexElem.textContent = userDetails.sex || 'Select Gender';
        
        const addressElem = document.getElementById('edit_patient_address');
        addressElem.value = userDetails.address || 'N/A';
        
    }
    
    function showUserStatusDiv() {
        const userStatusDiv = document.getElementById('user_status_div');
        const computedStyle = window.getComputedStyle(userStatusDiv);
        if (computedStyle.display === "none") {
            userStatusDiv.style.display = 'block';
            if(userStatusDiv.style.display = 'block'){
                userStatusDiv.style.zIndex = "200";
                showOverlay();
            }
        }
    }

        
    function hideUserStatusDiv() {
        const userStatusDiv = document.getElementById('user_status_div');
        
        const computedStyle = window.getComputedStyle(userStatusDiv);
        if (computedStyle.display === "block") {
            userStatusDiv.style.display = 'none';
        }
    }
    function hideOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'block') {
          overlayDiv.style.display = 'none';
        }
    }

    function showUserEditProfileDiv() {
        const userProfileEditDiv = document.getElementById('user_profile_edit');
        const computedStyle = window.getComputedStyle(userProfileEditDiv);
        if (computedStyle.display === "none") {
            userProfileEditDiv.style.display = 'block';
            if(userProfileEditDiv.style.display = 'block'){
                userProfileEditDiv.style.zIndex = "202";
                showOverlay();
            }
        }
    }

    function hideUserEditProfileDiv() {
        const userProfileEditDiv = document.getElementById('user_profile_edit');
        
        const computedStyle = window.getComputedStyle(userProfileEditDiv);
        if (computedStyle.display === "block") {
            userProfileEditDiv.style.display = 'none';
        }
    }

    // functions to show and hide the new disease div
    function hideNewDiseaseDiv() {
        const newDiseaseDiv = document.getElementById('add_disease_div');
        const confirmationButton = document.getElementById('update_button');
        const computedStyle = window.getComputedStyle(newDiseaseDiv);
      
        if (computedStyle.display === 'none') {
          newDiseaseDiv.style.display = 'flex';
          confirmationButton.style.display = 'block';
        } else {
            newDiseaseDiv.style.display = 'none';
            confirmationButton.style.display = 'none';
        }
    }

    //BUTTONS
    const addNewDisease = document.getElementById('add_disease_button');
    addNewDisease.addEventListener('click', () => {
        hideNewDiseaseDiv();
    });

    const editProfileButton = document.getElementById('edit_user_button');
    editProfileButton.addEventListener('click', () => {
        showUserEditProfileDiv();
        updateUserEditDiv(window.userDetails, window.userData, window.doctorData);
    });

    const closeProfileButton = document.getElementById('user_edit_exit_div');
    closeProfileButton.addEventListener('click', () => {
        hideUserEditProfileDiv();
    });
    
    
    function showOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'none') {
          overlayDiv.style.display = 'block';
          overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
      }
    
    const myButton = document.getElementById('user_exit_div');
    myButton.addEventListener('click', () => {
        hideUserStatusDiv();
        hideOverlay();
    });
    
    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;
        const clickedRow = event.target.closest('tr');
        if (!clickedRow) return;
        userId = clickedRow.cells[1].textContent;
    
        
        fetchUserDetails(userId)
            .then(userDetails => {
                const userId = userDetails.id;
                const doctorId = userDetails.doctor_id;
                return fetchRelatedData(userId, doctorId)
                .then(([userData, doctorData]) => {
                    updateUserStatusDiv(userDetails, userData, doctorData);
                    //  updateUserEditDiv(userDetails, userData, doctorData);
                    window.userDetails = userDetails;
                    window.userData = userData;
                    window.doctorData = doctorData;
                    console.log("there are", userDetails);
                    showUserStatusDiv();
                });
            })
            .catch(error => {
                console.error("Error fetching user details or related data:", error);
            });
        });
   
    /*
    function updateUser() {
        if (!userId) {
        alert("user ID is not available. Please select an user first.");
        return;
        }
    
        const selectedOption1 = document.getElementById('option_select_2').value;
        const selectedOption2 = document.getElementById('option_select_3').value;
        const selectedOption3 = document.getElementById('option_select_4').value;
        let selectedOption;
    
        console.log(selectedOption);
        
        if (selectedOption === "") {
            alert("Please select a valid user status.");
            return;
        }
    
        if(selectedOption1 === "Confirmed") {
            selectedOption = selectedOption1;
        } else if(selectedOption2 === "Cancelled"){
            selectedOption = selectedOption2;
        } else if(selectedOption3 === "No-show"){
            selectedOption = selectedOption2;
        } else{
            alert("Please select a valid user status");
            return;
        }
    
        
        const userData = {
            user_status: selectedOption,
        };
        
        
        const jsonData = JSON.stringify(userData);
    
        console.log(userData);
        
    
        const request = new Request(`http://0.0.0.0:5000/api/v1/user/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: jsonData,
        });
        
        fetch(request)
        .then(response => {
            if (response.ok) {
                showFeedbackDiv();
                return response.json();
            } else {
                throw new Error(`Error updating user: ${response.statusText}`);
            }
        })
        .then(jsonData => {
            showFeedbackDiv();
            console.log(jsonData);
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            const message = jsonData.Message;
            console.log(message);
            confirmationTextDiv.textContent = message;
        })
        .catch(error => alert(error));
    }
    
    const updateButton = document.getElementById('update_button');
    updateButton.addEventListener('click', () => {
        hideUserStatusDiv();
        updateUser();
    });*/
    
    function showFeedbackDiv() {
        const feedbackDiv = document.getElementById("returned_info");
        feedbackDiv.style.display = "block";
        feedbackDiv.style.zIndex = "200";
    }
    function hideFeedbackDiv() {
        const feedbackDiv = document.getElementById("returned_info");
        feedbackDiv.style.display = "none";
        window.location.reload();
      }
    
    const okButton = document.getElementById('ok_button');
    okButton.addEventListener('click', () => {
        hideFeedbackDiv();
    });
    
    tableBody.addEventListener('click', (event) => {
        if (event.target.type === 'checkbox') {
            const checkbox = event.target;
            checkbox.parentElement.style.color = 'red';
            const checkboxId = checkbox.id;
            console.log('Clicked checkbox ID:', checkboxId);
                        
            const clickedRow = checkbox.closest('tr');
            clickedRow.style.color = checkbox.checked ? '#1a6860' : '';
            clickedRow.style.backgroundColor = checkbox.checked ? '#E2F3E6' : '';
        }
    });



    //FUNCTION THAT DELETES A USER
    function deleteUser(userId) {
        const deleteRequest = `http://0.0.0.0:5000/api/v1/user/${userId}`;
    
        fetch(deleteRequest, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                hideConfirmationDiv();
                return response.json();
            } else {
            console.error("Error deleting user:", response.statusText);
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

    //FETCHES ALL DISEASES FIRST
    const diseaseSelect = document.getElementById("disease_select");
    let diseaseId;

    function fetchDiseases() {
    fetch("http://0.0.0.0:5000/api/v1/diseases")
    .then(response => response.json())
    .then(data => {
        console.log('Diseases fetched:', data);
        data.forEach(disease => {
            const option = document.createElement("option");
            if (option === "") {
                alert("Please select a valid user status.");
                return;
            }

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
    

    // FUNCTION THAT CREATES NEW PATIENT'S DISEASE
    function createNewDisease() {
       
        const doctorData = {
          disease_id: diseaseId,
        };
        
        const jsonData = JSON.stringify(doctorData);
      
        const request = new Request(`http://0.0.0.0:5000/api/v1/user/${userId}/disease`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
          },
          body: jsonData,
        });
        
        fetch(request)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
              console.error("Error creating new disease:", response.statusText);
              
            }
        })
        .then(jsonData => {
            hideUserStatusDiv();
            showFeedbackDiv();
            console.log("this is", jsonData);
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            const message = jsonData.Message;
            // console.log(message);
            confirmationTextDiv.textContent = message;
        })
        .catch(error => {
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            confirmationTextDiv.textContent = "Error while adding a new Disease to patient. Check to make sure you're connected to the internet"; 
        });
    }

    const updateDiseaseButton = document.getElementById('update_button');
    updateDiseaseButton.addEventListener("click", function() {
        createNewDisease();
    });
      
  

});

// SHOWS CONFIRMATION DIV
function showConfirmationDiv() {
  const confirmationDiv = document.getElementById('confirmation_div');
     
  if (confirmationDiv.style.display === 'none') {
    confirmationDiv.style.display = 'block';
  }
}

function hideConfirmationDiv() {
    const confirmationDiv = document.getElementById("confirmation_div");
    confirmationDiv.style.display = "none";
}
// FUNCTION TO DISPLAY THE DIV
function showFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "block";
}
function hideFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "none";

}
document.addEventListener('DOMContentLoaded', () => {
    showConfirmationDiv();
    hideConfirmationDiv();
    showFeedbackDiv();
    hideFeedbackDiv();
})