document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/doctors'; // Replace with your actual API endpoint
    const pageSize = 10;
    let currentPage = 1;
    let doctorData = [];

    // DOM elements
    const tableBody = document.getElementById('myDoctorTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    const customToken = localStorage.getItem('X-Custom-Token');
    function getAuthHeaders() {
      return {
          'X-Custom-Token': customToken
      };
    }

    function fetchAllDoctors() {
        fetch(requestUrl, { headers: getAuthHeaders()})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                doctorData = data;
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
        const currentPageDoctor = doctorData.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        currentPageDoctor.forEach(doctor => {
            console.log(doctor);
            const tableRow = document.createElement("tr");

            let statusColor = '';
            if (doctor.status === 'Inactive') {
                statusColor = 'red';
            } else {
                statusColor = '#30B3DE';
            }
            let availabilityColor = '';
            if (doctor.availability === false) {
                availabilityColor = 'red';
            } else {
                availabilityColor = '#30B3DE';
            }

            let availabilityText = '';
            if (doctor.availability === true) {
                availabilityText = 'Yes';
            } else {
                availabilityText = 'No';
            }

            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${doctor.id}</td>
                <td>${doctor.first_name}</td>
                <td>${doctor.last_name}</td>
                <td>${doctor.email}</td>
                <td>${doctor.license_no}</td>
                <td>${doctor.specialization || 'N/A'}</td>
                <td>${doctor.telephone_no || 'N/A'}</td>
                <td span class="status-indicator" style="background-color: ${doctor.status === 'Active' ? '#B0E1F2' : '#FFA3A3'}; margin-top: 12%; text-align: center; color: ${statusColor};">${doctor.status}</td>
                <td style="color: ${availabilityColor};">${availabilityText}</td>
            `;
            tableBody.appendChild(tableRow);
        });
        pageNumSpan.textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= doctorData.length;
    }

    fetchAllDoctors();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredDoctors = doctorData.filter(doctor =>
            doctor.first_name.toLowerCase().includes(searchTerm) ||
            doctor.last_name.toLowerCase().includes(searchTerm) ||
            doctor.email.toLowerCase().includes(searchTerm) ||
            doctor.id.toLowerCase().includes(searchTerm)
        );

        tableBody.innerHTML = '';
        filteredDoctors.forEach(doctor => {
            const tableRow = document.createElement("tr");
            let statusColor = '';
            if (doctor.status === 'Inactive') {
                statusColor = 'red';
            } else {
                statusColor = '#30B3DE';
            }

            let availabilityColor = '';
            if (doctor.availability === false) {
                availabilityColor = 'red';
            } else {
                availabilityColor = '#30B3DE';
            }

            let availabilityText = '';
            if (doctor.availability === true) {
                availabilityText = 'Yes';
            } else {
                availabilityText = 'No';
            }

            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${doctor.id}</td>
                <td>${doctor.first_name}</td>
                <td>${doctor.last_name}</td>
                <td>${doctor.email}</td>
                <td>${doctor.license_no}</td>
                <td>${doctor.specialization || 'N/A'}</td>
                <td>${doctor.telephone_no || 'N/A'}</td>
                <td span class="status-indicator" style="background-color: ${doctor.status === 'Active' ? '#B0E1F2' : '#FFA3A3'}; margin-top: 12%; text-align: center; color: ${statusColor};">${doctor.status}</td>
                <td style="color: ${availabilityColor};">${availabilityText}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Clear search input
        searchInput.value = '';
    });
    
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();

            const filteredDoctors = doctorData.filter(doctor =>
                doctor.first_name.toLowerCase().includes(searchTerm) ||
                doctor.last_name.toLowerCase().includes(searchTerm) ||
                doctor.email.toLowerCase().includes(searchTerm) ||
                doctor.id.toLowerCase().includes(searchTerm)
            );

            tableBody.innerHTML = '';
            filteredDoctors.forEach(doctor => {
                const tableRow = document.createElement("tr");
                let statusColor = '';
                if (doctor.status === 'Inactive') {
                    statusColor = 'red';
                } else {
                    statusColor = '#30B3DE';
                }

                let availabilityColor = '';
                if (doctor.availability === false) {
                    availabilityColor = 'red';
                } else {
                    availabilityColor = '#30B3DE';
                }

                let availabilityText = '';
                if (doctor.availability === true) {
                    availabilityText = 'Yes';
                } else {
                    availabilityText = 'No';
                }

                tableRow.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${doctor.id}</td>
                    <td>${doctor.first_name}</td>
                    <td>${doctor.last_name}</td>
                    <td>${doctor.email}</td>
                    <td>${doctor.license_no}</td>
                    <td>${doctor.specialization || 'N/A'}</td>
                    <td>${doctor.telephone_no || 'N/A'}</td>
                    <td span class="status-indicator" style="background-color: ${doctor.status === 'Active' ? '#B0E1F2' : '#FFA3A3'}; margin-top: 12%; text-align: center; color: ${statusColor};">${doctor.status}</td>
                    <td style="color: ${availabilityColor};">${availabilityText}</td>
                `;
                tableBody.appendChild(tableRow);
            });
            searchInput.value = '';
        }
    });

    // Add click event listeners for pagination buttons and increments them on clicking till there' no more data to append to table
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

    
    tableBody.addEventListener('click', (event) => {
        if (event.target.type === 'checkbox') {
            const checkbox = event.target;
            checkbox.parentElement.style.color = 'red';
            const checkboxId = checkbox.id;
            console.log('Clicked checkbox ID:', checkboxId);
            /*
            const userId = checkbox.id.split('checkbox-')[1]; 
            const saveButton = document.getElementById('yes_button');
            saveButton.addEventListener("click", function() {
                deleteUser(userId);
            });  */
            
            const clickedRow = checkbox.closest('tr');
            clickedRow.style.color = checkbox.checked ? '#1a6860' : '';
            clickedRow.style.backgroundColor = checkbox.checked ? '#E2F3E6' : '';
        }
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;
        const clickedRow = event.target.closest('tr');
        if (!clickedRow) return;
        doctorId = clickedRow.cells[1].textContent;
    
        
        fetchDoctorDetails(doctorId)
            .then(doctorDetails => {
                const doctorId = doctorDetails.id;
                const hospitalId = doctorDetails.hospital_id;
                return fetchRelatedData(doctorId, hospitalId)
                .then(([doctorData, hospitalData]) => {
                    updateDoctorStatusDiv(doctorDetails, doctorData, hospitalData);
                    //  updateDoctorEditDiv(doctorDetails, doctorData, doctorData);
                    window.doctorDetails = doctorDetails;
                    window.doctorData = doctorData;
                    window.hospitalData = hospitalData;
                    console.log("there are", hospitalData);
                    showDoctorStatusDiv();
                });
            })
            .catch(error => {
                console.error("Error fetching doctor details or related data:", error);
            });
    });

    function fetchDoctorDetails(doctorId) {
        const doctorDetailsUrl = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}`;
        return fetch(doctorDetailsUrl, { headers: getAuthHeaders() })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
    function fetchRelatedData(doctorId, hospitalId) {
        console.log(doctorId);
        return Promise.all([
            fetch(`http://0.0.0.0:5000/api/v1/doctor/${doctorId}`, { headers: getAuthHeaders() }).then(response => response.json()),
            fetch(`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`, { headers: getAuthHeaders() }).then(response => response.json()),
        ]);
    }

    //UPDATES DOCTOR PPROFILE DATA
    function updateDoctorStatusDiv(doctorDetails, doctorData, hospitalData) {
        const doctorStatusDiv = document.getElementById('doctor_status_div');
        
        document.getElementById('doctor_id_id').textContent = `Doctor Id: ${doctorDetails.id}`;

        const doctorNameElem = document.getElementById('first_name');
        doctorNameElem.textContent = doctorDetails.first_name || 'N/A';
        
        const doctorNameElem1 = document.getElementById('last_name');
        doctorNameElem1.textContent = doctorDetails.last_name || 'N/A';  
                
        const doctorLicenseNo = document.getElementById('license_no');
        doctorLicenseNo.textContent = doctorDetails.license_no;
        
        const doctorDescriptionElem = document.getElementById('doctor_email');
        doctorDescriptionElem.textContent = doctorDetails.email;
        
                
        const assignedHospital = document.getElementById('hospital_name');
        assignedHospital.textContent = hospitalData.name;
        
        const telephoneElem = document.getElementById('phone_number');
        telephoneElem.textContent = doctorDetails.telephone_no || 'N/A';

        const profileInfoElem = document.getElementById('profile_info_div');
        profileInfoElem.textContent = doctorDetails.profile_bio || 'N/A';


        const specializationElem = document.getElementById('specialization');
        specializationElem.textContent = doctorDetails.specialization || 'N/A';
        const doctorStatusElem = document.getElementById('activity_status');
        if(doctorDetails.status === "Active"){
            doctorStatusElem.style.background = "#A3DDF0";
            doctorStatusElem.style.border = "1px solid #89D3EC";
        } else {
            doctorStatusElem.style.background = "#FF8F8F";
            doctorStatusElem.style.border = "1px solid #FF7070";
        }
        console.log(doctorDetails.status);
        doctorStatusElem.textContent = doctorDetails.status;
        
        const availabilityElem = document.getElementById('doctor_availability');
        if(doctorDetails.availability === true){
            availabilityElem.textContent = 'Available';
            availabilityElem.style.color = '#30baea';
        } else{
            availabilityElem.textContent = "Not Available";
        }
        
        
        
    }

    function showOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'none') {
          overlayDiv.style.display = 'block';
          overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
    }

    function showDoctorStatusDiv() {
        const doctorStatusDiv = document.getElementById('doctor_status_div');
        const computedStyle = window.getComputedStyle(doctorStatusDiv);
        if (computedStyle.display === "none") {
            doctorStatusDiv.style.display = 'block';
            if(doctorStatusDiv.style.display = 'block'){
                doctorStatusDiv.style.zIndex = "200";
                showOverlay();
            }
        }
    }

    function hideDoctorStatusDiv() {
        const doctorStatusDiv = document.getElementById('doctor_status_div');
        const computedStyle = window.getComputedStyle(doctorStatusDiv);
        if (computedStyle.display === "block") {
            doctorStatusDiv.style.display = 'none';            
        }
    }
    const doctorStatusExit = document.getElementById('doctor_exit_div');
    doctorStatusExit.addEventListener('click', () => {
        hideDoctorStatusDiv();
        hideOverlay();
    });

    
    function hideOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'block') {
          overlayDiv.style.display = 'none';
        }
    }

    //SHOW DOCTOR EDIT DIV AND CLOSE DOCTOR EDIT DIV
    function showEditDoctorDiv() {
        const doctorEditDiv = document.getElementById('edit_doctor_status_div');
        const computedStyle = window.getComputedStyle(doctorEditDiv);
        if (computedStyle.display === "none") {
            doctorEditDiv.style.display = 'block';
            if(doctorEditDiv.style.display = 'block'){
                doctorEditDiv.style.zIndex = "200";
                showOverlay();
            }
        }
    }
    function hideEditDoctorDiv() {
        const doctorEditDiv = document.getElementById('edit_doctor_status_div');
        const computedStyle = window.getComputedStyle(doctorEditDiv);
        if (computedStyle.display === "block") {
            doctorEditDiv.style.display = 'none';            
        }
    }
    
    const editDoctorProfile = document.getElementById('edit_doctor_button');
    editDoctorProfile.addEventListener('click', () => {
        showEditDoctorDiv();
        updateDoctorEditDiv(window.location.doctorDetails, doctorData, hospitalData);
    });

    const closeEditDoctorProfile = document.getElementById('edit_doctor_exit_div');
    closeEditDoctorProfile.addEventListener('click', () => {
        hideEditDoctorDiv();
    });

    //FETCHES ALL HOSPITALS TO UPDATE DOCTORS TO
    const hospitalSelect = document.getElementById("hospital_select");
    let hospitalId;

    function fetchHospitals() {
    fetch ("http://0.0.0.0:5000/api/v1/hospitals", {
        headers: {
            ...getAuthHeaders(),
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Doctors fetched:', data);
        data.forEach(hospital => {
            const option = document.createElement("option");
            
            option.value = hospital.id; 
            option.innerText = hospital.name;
            hospitalSelect.appendChild(option);
        });
        })
        .catch(error => console.error("Error fetching hospital:", error));
    }
    console.log('finished fetching hospitals')
    fetchHospitals();

    hospitalSelect.addEventListener("change", function() {
        hospitalId = this.value;
    });

    function updateDoctorEditDiv() {
        const doctorStatusDiv = document.getElementById('doctor_profile_edit');
        console.log(doctorData);
        console.log(doctorDetails.id);
        
        const headerText = document.getElementById('doctor_edit_id');
        headerText.textContent = `Doctor Id: ${doctorDetails.id}`;
        
        const doctorNameElem = document.getElementById('edit_first_name');
        doctorNameElem.value = doctorDetails.first_name || 'N/A';
                
        const doctorNameElem1 = document.getElementById('edit_last_name');
        doctorNameElem1.value = doctorDetails.last_name || 'N/A';  
                
        const doctorDateOfBirth = document.getElementById('edit_license_no');
        doctorDateOfBirth.value = doctorDetails.license_no;
        
        const doctorDescriptionElem = document.getElementById('edit_doctor_email');
        doctorDescriptionElem.value = doctorDetails.email;
        
        const hospitalNameElem = document.getElementById('hospital_option_select_1');
        hospitalNameElem.textContent = hospitalData.name || 'Select Hospital';
        
        const telephoneElem = document.getElementById('edit_phone_number');
        telephoneElem.value = doctorDetails.telephone_no || 'N/A';

        const specializationElem = document.getElementById('edit_specialization');
        specializationElem.value = doctorDetails.specialization || 'N/A';

        const availabilityElem = document.getElementById('option_select_1');
        // const genderSelect = document.getElementById("gender_select");
        const option1 = document.getElementById("option_select_1");
        const option2 = document.getElementById("option_select2");
        const option3 = document.getElementById("option_select3");
        
        option1.textContent = "Select Availability";
        option2.textContent = "Unavailable";


        if(doctorDetails.availability === true){
            option1.textContent = "Available";
            option3.textContent = "Unavailable";
            option2.style.display = "none";
        } else if(doctorDetails.availability === false){
            option1.textContent = 'Unavailable';
            option2.textContent = 'Available';
            option3.style.display = "none";
        } else {
            option1.textContent = 'Select Availability';
            option2.textContent = "Available";
            option3.textContent = "Unavailable";
        }
        // availabilityElem.textContent = doctorDetails.availability || 'Select Availability';
        
        const profileBioElem = document.getElementById('input_profile_info_div');
        profileBioElem.value = doctorDetails.profile_bio || 'N/A';
    }

    // FEEDBACK DIVS
    function showFeedbackDiv() {
        const feedbackDiv = document.getElementById("returned_info");
        feedbackDiv.style.display = "block";
        feedbackDiv.style.zIndex = "450";
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

    //PUT HTTP REQUEST TO UPDATE DOCTOR DATA
    const availabilitySelect = document.getElementById("availability_select");
    function updateDoctor() {

        let availabilityValue;
        if(availabilitySelect.value === "Available") {
            availabilityValue = true;
        } else {
            availabilityValue = false;
        }
        
        const originalDoctorData = {
            first_name: document.getElementById('edit_first_name').value,
            last_name: document.getElementById('edit_last_name').value,
            license_no: document.getElementById('edit_license_no').value,
            email: document.getElementById('edit_doctor_email').value,
            hospital_id: hospitalId,
            telephone_no: document.getElementById('edit_phone_number').value || null,
            specialization: document.getElementById('edit_specialization').value,
            availability: availabilityValue,
            profile_bio: document.getElementById('input_profile_info_div').value,
        };
        
        const changedData = {};
        Object.keys(originalDoctorData).forEach(key => {
            if (originalDoctorData[key] !== doctorDetails[key]) {
                changedData[key] = originalDoctorData[key];
            }
        });

        if (Object.keys(changedData).length === 0) {
            alert('No changes detected');
            return;
        }
        
        const jsonData = JSON.stringify(changedData);
        console.log(changedData);
        

        const request = new Request(`http://0.0.0.0:5000/api/v1/doctor/${doctorId}`, {
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
            hideEditDoctorDiv();
            showFeedbackDiv();
            console.log(jsonData);
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            const message = jsonData.Message;
            console.log(message);
            confirmationTextDiv.textContent = message;
        })
        .catch(error => alert(error));
    }

    const updateDoctorButton = document.getElementById('update_doctor_profile_button');
    updateDoctorButton.addEventListener('click', () => {
        hideDoctorStatusDiv();
        updateDoctor(doctorId);
    });

    const addPatientButton = document.getElementById('add_patient_button');
    addPatientButton.addEventListener('click', () => {
        showNewUserEditDiv();
        showOverlay();
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

    const genderSelect = document.getElementById("gender_select");
    
    function createUser() {
        
        const originalUserData = {
            first_name: document.getElementById('patient_first_name').value,
            last_name: document.getElementById('patient_last_name').value,
            date_of_birth: document.getElementById('edit_date_of_birth').value,
            doctor_id: doctorId,
            email: document.getElementById('edit_user_email').value,
            telephone_no: document.getElementById('patient_phone_number').value || null,
            password: document.getElementById('edit_password').value,
            sex: genderSelect.value,
            status: "Active",
            address: document.getElementById('edit_patient_address').value,
        };
    
        
        
        const jsonData = JSON.stringify(originalUserData);
                
    
        const request = new Request(`http://0.0.0.0:5000/api/v1/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: jsonData,
        });

        fetch(request)
        .then(response => {
            if (!response.ok) {
                return response.json()
                .then(errorData => {
                    console.log(errorData);
                    hideNewUserEditDiv();
                    showFeedbackDiv();
                    const message = errorData.Message;
                    const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
                    confirmationTextDiv.textContent = message || 'An error occurred. Try again.';
                    confirmationTextDiv.style.color = "red";
                });
            }
            else {
                return response.json();
            }
        })
        .then(jsonData => {
            if (jsonData.error) {
                hideNewUserEditDiv();
                showFeedbackDiv();
                const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
                confirmationTextDiv.style.color = "red";
                confirmationTextDiv.textContent = jsonData.error.message || 'An error occurred. Try again.';
            } else {
                hideNewUserEditDiv();
                showFeedbackDiv();
                console.log(jsonData);
                const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
                const message = jsonData.Message;
                console.log(message);
                confirmationTextDiv.textContent = message;
            }
        })
        .catch(error);
    }

    const createNewDisease = document.getElementById('create_new_user_button');
    createNewDisease.addEventListener('click', () => {
        createUser();
    });
    const closeNewUserDiv = document.getElementById('user_edit_exit_div');
    closeNewUserDiv.addEventListener('click', () => {
        hideNewUserEditDiv();
    });

    function showNewUserEditDiv() {
        const newUserProfileEditDiv = document.getElementById('create_new_user');
        const computedStyle = window.getComputedStyle(newUserProfileEditDiv);
        if (computedStyle.display === "none") {
            newUserProfileEditDiv.style.display = 'block';
            if(newUserProfileEditDiv.style.display = 'block'){
                newUserProfileEditDiv.style.zIndex = "202";
                showOverlay();
            }
        }
    }

    function hideNewUserEditDiv() {
        const newUserProfileEditDiv = document.getElementById('create_new_user');
        
        const computedStyle = window.getComputedStyle(newUserProfileEditDiv);
        if (computedStyle.display === "block") {
            newUserProfileEditDiv.style.display = 'none';
        }
    }
});