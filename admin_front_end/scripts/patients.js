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

            let statusColor = '';
            if (user.status === 'Inactive') {
                statusColor = 'red';
            } else {
                statusColor = '#30B3DE';
            }

            tableRow.innerHTML = `
                <td style="max-width: 10px;"><input type="checkbox" id="checkbox-${user.id}"></td>
                <td>${user.id}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td>${user.date_of_birth}</td>
                <td>${user.sex || 'N/A'}</td>
                <td>${user.telephone_no || 'N/A'}</td>
                <td span class="status-indicator" style="background-color: ${user.status === 'Active' ? '#B0E1F2' : '#FFA3A3'}; margin-top: 15%; text-align: center; color: ${statusColor};">${user.status}</td>
                <td>${user.address || 'N/A'}</td>
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
        const userStatusElem = document.getElementById('activity_status');
        if(userDetails.status === "Active"){
            userStatusElem.style.background = "#A3DDF0";
            userStatusElem.style.border = "1px solid #89D3EC";
        } else {
            userStatusElem.style.background = "#FF8F8F";
            userStatusElem.style.border = "1px solid #FF7070";
        }
        console.log(userDetails.status);
        userStatusElem.textContent = userDetails.status;
        
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
        
                        
        const doctorNameElem = document.getElementById('doctor_option_select_1');
        doctorNameElem.textContent = `${doctorData.first_name} ${doctorData.last_name}`;
        
        const telephoneElem = document.getElementById('edit_phone_number');
        telephoneElem.value = userDetails.telephone_no || 'N/A';

        const sexElem = document.getElementById('option_select_1');
        // const genderSelect = document.getElementById("gender_select");
        const option1 = document.getElementById("option_select_1");
        const option2 = document.getElementById("option_select2");
        const option3 = document.getElementById("option_select3");
        
        option1.textContent = "Select Gender";
        option2.textContent = "Female";


        if(userDetails.sex === "Male"){
            option1.textContent = "Male";
            option3.textContent = "Female";
            option2.style.display = "none";
        } else if(userDetails.sex === "Female"){
            option1.textContent = 'Female';
            option2.textContent = 'Male';
            option3.style.display = "none";
        } else {
            option1.textContent = 'Select Gender';
            option2.textContent = "Male";
            option3.textContent = "Female";
        }
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
    
    //FETCHES ALL DOCTORS TO UPDATE USER DISEASES
    const doctorSelect = document.getElementById("doctor_select");
    let doctorId;

    function fetchDoctors() {
    fetch ("http://0.0.0.0:5000/api/v1/doctors", {
        headers: {
            ...getAuthHeaders(),
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Doctors fetched:', data);
        data.forEach(doctor => {
            const option = document.createElement("option");
            
            option.value = doctor.id; 
            option.innerText = `${doctor.first_name} ${doctor.last_name}`;
            doctorSelect.appendChild(option);
        });
        })
        .catch(error => console.error("Error fetching doctors:", error));
    }
    console.log('finished fetching doctors')
    fetchDoctors();

    doctorSelect.addEventListener("change", function() {
        doctorId = this.value;
    });

    const genderSelect = document.getElementById("gender_select");
    let selectedGender;

    genderSelect.addEventListener('change', function () {
        selectedGender = genderSelect.value;
    });
    
    function updateUser() {
        
        const originalUserData = {
            first_name: document.getElementById('edit_first_name').value,
            last_name: document.getElementById('edit_last_name').value,
            date_of_birth: document.getElementById('edit_date_of_birth').value,
            doctor_id: doctorId,
            email: document.getElementById('edit_user_email').value,
            telephone_no: document.getElementById('edit_phone_number').value || null,
            sex: selectedGender,
            address: document.getElementById('edit_patient_address').value,
        };
        
        const changedData = {};
        Object.keys(originalUserData).forEach(key => {
            if (originalUserData[key] !== userDetails[key]) {
                changedData[key] = originalUserData[key];
            }
        });

        if (Object.keys(changedData).length === 0) {
            alert('No changes detected');
            return;
        }
        
        const jsonData = JSON.stringify(changedData);
    
        console.log(changedData);
        
    
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
            hideUserEditProfileDiv();
            showFeedbackDiv();
            console.log(jsonData);
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            const message = jsonData.Message;
            console.log(message);
            confirmationTextDiv.textContent = message;
        })
        .catch(error => alert(error));
    }
    
    const updateButton = document.getElementById('update_user_profile_button');
    updateButton.addEventListener('click', () => {
        hideUserStatusDiv();
        updateUser(window.userDetails);
    });
    
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



    // SHOWS CONFIRMATION DIV
    function showConfirmationDiv() {
        const confirmationDiv = document.getElementById('confirmation_div');
        const computedStyle = window.getComputedStyle(confirmationDiv);
        if (computedStyle.display === 'none') {
            confirmationDiv.style.display = 'block';
            confirmationDiv.style.zIndex = "250";
            hideUserStatusDiv();
            showOverlay();
        }
    }
    function hideConfirmationDiv() {
        const confirmationDiv = document.getElementById("confirmation_div");
        confirmationDiv.style.display = "none";
    }
    const deletePatientConfirmationButton = document.getElementById('delete_user_button');
    deletePatientConfirmationButton.addEventListener("click", function() {
        showConfirmationDiv();
    });
    const hideDeletePatientButton = document.getElementById('no_button');
    hideDeletePatientButton.addEventListener("click", function() {
        hideConfirmationDiv();
        hideOverlay();
        window.location.reload();
    });
    
    
    //FUNCTION THAT DELETES A USER
    function deleteUser() {
        const deleteRequest = `http://0.0.0.0:5000/api/v1/user/${userId}`;
        
        fetch(deleteRequest, {
            method: "DELETE",
            headers: {
                ...getAuthHeaders()
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("yes yes yes");
                hideConfirmationDiv();
                return response.json();
            } else {
            console.error("Error deleting user:", response.statusText);
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
      .catch(error => alert("Error sending request:", error));
    }
    const deletePatientButton = document.getElementById('yes_button');
    deletePatientButton.addEventListener("click", function() {
        deleteUser();
        hideConfirmationDiv();
        hideOverlay();
        window.location.reload();
    });


    //FETCHES ALL DISEASES TO UPDATE USER DISEASES
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

    // FUNCTION TO DISPLAY USER VITALS

    function getUserVitals () {
        const bloodSugarLevels = [];
        const restingHeartRate = [];
        const systolicBloodPressure= [];
        const diastolicBloodPresure = [];
        const patientWeight = [];
        const patientHeight = [];

        console.log(userId);
        fetch(`http://0.0.0.0:5000/api/v1/user/${userId}/vitals`, { headers: getAuthHeaders() })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(vitalData => {
            console.log(vitalData);
            const ctx = document.getElementById('vital_charts').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: vitalData.map(data => new Date(data.created_at).toLocaleDateString()),
                    datasets: [{
                        label: 'Blood Sugar Levels',
                        data: vitalData.map(data => data.blood_sugar_level),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Resting Heart Rate',
                        data: vitalData.map(data => data.resting_heart_rate),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Systolic Blood Pressure',
                        data: vitalData.map(data => data.systolic_blood_pressure),
                        borderColor: 'rgba(26, 104, 96, 1)',
                        backgroundColor: 'rgba(26, 104, 96, 0.2)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Diastolic Blood Pressure',
                        data: vitalData.map(data => data.diastolic_blood_pressure),
                        borderColor: 'rgba(200, 150, 102, 1)',
                        backgroundColor: 'rgba(200, 150, 102, 0.2)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Weight',
                        data: vitalData.map(data => data.weight),
                        borderColor: 'rgba(105, 62, 254, 1)',
                        backgroundColor: 'rgba(105, 62, 254, 0.2)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Height',
                        data: vitalData.map(data => data.height),
                        borderColor: 'rgba(165,206,110, 1)',
                        backgroundColor: 'rgba(165, 206, 110, 0.2)',
                        borderWidth: 1,
                    }
                ]
                },
                options: {
                    x: {
                        display: true,
                        label: 'Date',
                        ticks: { 
                        }
                    },
                    y: {
                        display: true,
                        label: {
                            display: true,
                            text: 'Values'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            });

            vitalData.forEach(value => {
                bloodSugarLevels.push(value.blood_sugar_level);
                restingHeartRate.push(value.resting_heart_rate);
                systolicBloodPressure.push(value.systolic_blood_pressure);
                diastolicBloodPresure.push(value.diastolic_blood_pressure);
                patientWeight.push(value.weight);
                patientHeight.push(value.height);
            });

            const avgHeight = document.getElementById('avg_height');
            const avgWeight = document.getElementById('avg_weight');
            const avgHr = document.getElementById('avg_hr');
            const avgSl = document.getElementById('avg_sl');
            const avgSbp = document.getElementById('avg_sbp');
            const avgDbp = document.getElementById('avg_dbp');

            if(patientHeight.length === 0) {
                avgHeight.textContent = "0.0 M";
            } else {
                avgHeight.textContent = calculateAverage(patientHeight).toFixed(3) + ' ' + 'M';
            }

            if(patientWeight.length === 0) {
                avgWeight.textContent = "0.0 Kgs";
            } else {
                avgWeight.textContent = calculateAverage(patientWeight).toFixed(3) + ' ' + 'Kgs';
            }

            if(restingHeartRate.length === 0) {
                avgHr.textContent = "0.0 bpm";
            } else {
                avgHr.textContent = calculateAverage(restingHeartRate).toFixed(3) + ' ' + 'bpm';
            }

            if(bloodSugarLevels.length === 0) {
                avgSl.textContent = "0.0 mg/dl";
            } else {
                avgSl.textContent = calculateAverage(bloodSugarLevels).toFixed(3) + ' ' + 'mg/dL';
            }
            
            if(systolicBloodPressure.length === 0) {
                avgSbp.textContent = "0.0 mmHg";
            } else {
                avgSbp.textContent = calculateAverage(systolicBloodPressure).toFixed(3) + ' ' + 'mmHg';
            }

            if(diastolicBloodPresure.length === 0) {
                avgDbp.textContent = "0.0 mmHg";
            } else {
                avgDbp.textContent = calculateAverage(diastolicBloodPresure).toFixed(3) + ' ' + 'mmHg';
            }

            function calculateAverage(data) {
                const sum = data.reduce((accumulator, current) => accumulator + current, 0) ;
                const average = sum / data.length;
                return average;
            }

        })
    }

    const showUserVitals = document.getElementById('user_vital_button');
    showUserVitals.addEventListener("click", function() {
        getUserVitals(userId);
    });

});




// FUNCTION TO DISPLAY THE DIV
function showFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "block";
}
function hideFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "none";

}