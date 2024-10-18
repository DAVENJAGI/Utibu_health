document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/hospitals';
    const pageSize = 10;
    let currentPage = 1;
    let hospitalData = [];

    const tableBody = document.getElementById('myHospitalTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');
    let townId;
    // let countyId;

    function getAuthHeaders() {
      return {
          'X-Custom-Token': customToken
      };
    }

    function fetchAllHospitals() {
        fetch(requestUrl, { headers: getAuthHeaders()})
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
    const clickedRow = event.target.closest('tr');
    if (!clickedRow) return;
    hospitalId = clickedRow.cells[1].textContent;

    
    fetchHospitalDetails(hospitalId)
        .then(hospitalDetails => {
            const hospitalId = hospitalDetails.id;
            townId = hospitalDetails.town_id;
            return fetchRelatedData(hospitalId, townId)
            .then(([hospitalData, townData, constituencyData]) => {
                updateHospitalStatusDiv(hospitalDetails, hospitalData, townData, constituencyData);
                //  updateHospitalEditDiv(hospitalDetails, hospitalData, hospitalData);
                window.hospitalDetails = hospitalDetails;
                window.hospitalData = hospitalData;
                window.townData = townData;
                showHospitalStatusDiv();
            });
        })
        .catch(error => {
            console.error("Error fetching hospital details or related data:", error);
        });
  });

  function fetchHospitalDetails(hospitalId) {
    const hospitalDetailsUrl = `http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`;
    return fetch(hospitalDetailsUrl, { headers: getAuthHeaders() })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
  }
  // const constituencyId = townData.constituency_id
  function fetchRelatedData(hospitalId, townId) {
    console.log(hospitalId);
    return Promise.all([
        fetch(`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`, { headers: getAuthHeaders() })
        .then(response => response.json())
        .then(hospitalData => {
          console.log(hospitalData);
          return fetch(`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}/departments`, { headers: getAuthHeaders() })
          .then(response => response.json())
          .then(departmentData => {
            console.log(departmentData);
            numberOfDepartments = departmentData.length;
            const deptNo = document.getElementById('dept_no');
            deptNo.textContent = numberOfDepartments; 
          })
        }),

        fetch(`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}/doctors`, { headers: getAuthHeaders() })
        .then(response => response.json())
        .then(doctorData => {

          numberOfDoctors = doctorData.length;
          const doctNo = document.getElementById('dkt_no');
          doctNo.textContent = numberOfDoctors; 
        }),

        fetch(`http://0.0.0.0:5000/api/v1/ward/${townId}`, { headers: getAuthHeaders() })
        .then(response => response.json())
        .then(townData => {
          const constituencyId = townData.constituency_id;
          window.townData = townData;
          console.log("constituency id is:", constituencyId);
          return fetch(`http://0.0.0.0:5000/api/v1/constituency/${constituencyId}`, { headers: getAuthHeaders() })
          .then(response => response.json())
          .then(constituencyData => {
              console.log("Here is constituency Data:", constituencyData);
              window.constituencyData = constituencyData;
              hospitalCountyId = constituencyData.county_id;
              console.log("hospital county id is:", hospitalCountyId);
              return fetch(`http://0.0.0.0:5000/api/v1/county/${hospitalCountyId}`, { headers: getAuthHeaders() })
              .then(response => response.json())
              .then(hospitalCountyData => {
                window.hospitalCountyData = hospitalCountyData;
                console.log("County data in which the hospital is found in:", hospitalCountyData);
              })
          })
        }),
    ]);
  }

  //UPDATES DOCTOR PPROFILE DATA
  function updateHospitalStatusDiv(hospitalDetails, hospitalData, townData, constituencyData) {
    const hospitalStatusDiv = document.getElementById('hospital_status_div');
    
    document.getElementById('hospital_id_id').textContent = `Hospital Id: ${hospitalDetails.id}`;

    const hospitalNameElem = document.getElementById('hosp_name');
    hospitalNameElem.textContent = hospitalDetails.name || 'N/A';
    
    const hospitalEmailElem = document.getElementById('hospital_email');
    hospitalEmailElem.textContent = hospitalDetails.email || 'N/A'; 
    
    const telephoneElem = document.getElementById('tel_no');
    telephoneElem.textContent = hospitalDetails.telephone_no || 'N/A';

    const constituencyFound = document.getElementById('constituency_name');
    constituencyFound.textContent = window.constituencyData.constituency_name;

    const townIn = document.getElementById('town_name');
    townIn.textContent = window.townData.town_name;

    const countyIn = document.getElementById('county_found');
    countyIn.textContent = window.hospitalCountyData.name;
   /* 
    const profileInfoElem = document.getElementById('profile_info_div');
    profileInfoElem.textContent = hospitalDetails.description || 'This hospital does not have currently set profile information';


    const specializationElem = document.getElementById('specialization');
    specializationElem.textContent = hospitalDetails.specialization || 'N/A';

    const hospitalStatusElem = document.getElementById('activity_status');
    if(hospitalDetails.status === "Active"){
        hospitalStatusElem.style.background = "#A3DDF0";
        hospitalStatusElem.style.border = "1px solid #89D3EC";
    } else {
        hospitalStatusElem.style.background = "#FF8F8F";
        hospitalStatusElem.style.border = "1px solid #FF7070";
    }
    console.log(hospitalDetails.status);
    hospitalStatusElem.textContent = hospitalDetails.status;
    
    const availabilityElem = document.getElementById('hospital_availability');
    if(hospitalDetails.availability === true){
        availabilityElem.textContent = 'Available';
        availabilityElem.style.color = '#30baea';
    } else{
        availabilityElem.textContent = "Not Available";
    }
    */
    
    
  }

  function showOverlay() {
    const overlayDiv = document.getElementById('overlay');
    const computedStyle = window.getComputedStyle(overlayDiv);

    if (computedStyle.display === 'none') {
      overlayDiv.style.display = 'block';
      overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
  }

  function showHospitalStatusDiv() {
    const hospitalStatusDiv = document.getElementById('hospital_status_div');
    const computedStyle = window.getComputedStyle(hospitalStatusDiv);
    if (computedStyle.display === "none") {
        hospitalStatusDiv.style.display = 'block';
        if(hospitalStatusDiv.style.display = 'block'){
            hospitalStatusDiv.style.zIndex = "200";
            showOverlay();
        }
    }
  }

  function showDepartmentsDiv() {
    const hospitalDepartmentDiv = document.getElementById('department_profile_edit');
    const computedStyle = window.getComputedStyle(hospitalDepartmentDiv);
    if (computedStyle.display === "none") {
      hospitalDepartmentDiv.style.display = 'block';
        if(hospitalDepartmentDiv.style.display = 'block'){
          hospitalDepartmentDiv.style.zIndex = "230";
            showOverlay1();
        }
    }
  }
  function hideDepartmentsDiv() {
    const hospitalDepartmentDiv = document.getElementById('department_profile_edit');
    const computedStyle = window.getComputedStyle(hospitalDepartmentDiv);
    if (computedStyle.display === "block") {
      hospitalDepartmentDiv.style.display = 'none';            
    }
  }
  
  function showOverlay1() {
    const overlayDiv1 = document.getElementById('overlay1');
    const computedStyle = window.getComputedStyle(overlayDiv1);

    if (computedStyle.display === 'none') {
      overlayDiv1.style.display = 'block';
      overlayDiv1.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
  }
  function hideOverlay1() {
    const overlayDiv1 = document.getElementById('overlay1');
    const computedStyle = window.getComputedStyle(overlayDiv1);

    if (computedStyle.display === 'block') {
      overlayDiv1.style.display = 'none';
    }
  }
  const showDepartmentButton = document.getElementById('department_click');
  showDepartmentButton.addEventListener('click', () => {
    showDepartmentsDiv();
    fetchHospitalDepartments();
  });
  const closeShowDepartmentButton = document.getElementById('department_edit_exit_div');
  closeShowDepartmentButton.addEventListener('click', () => {
    hideDepartmentsDiv();
    hideOverlay1();
  });


  function showAddDeptDiv() {
    const deptDiv = document.getElementById('department_description_info');
    const computedStyle = window.getComputedStyle(deptDiv);
    if (computedStyle.display === "none") {
      deptDiv.style.display = 'flex';
    } else {
      deptDiv.style.display = "none";
    }
  }
  const addNewDeptButton = document.getElementById('add_dept_button');
  addNewDeptButton.addEventListener('click', () => {
    showAddDeptDiv();
  });

  function hideHospitalStatusDiv() {
    const hospitalStatusDiv = document.getElementById('hospital_status_div');
    const computedStyle = window.getComputedStyle(hospitalStatusDiv);
    if (computedStyle.display === "block") {
        hospitalStatusDiv.style.display = 'none';            
    }
  }
  const hospitalStatusExit = document.getElementById('hospital_exit_div');
  hospitalStatusExit.addEventListener('click', () => {
    hideHospitalStatusDiv();
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
  function showEditHospitalDiv() {
    const hospitalEditDiv = document.getElementById('edit_hospital_status_div');
    const computedStyle = window.getComputedStyle(hospitalEditDiv);
    if (computedStyle.display === "none") {
        hospitalEditDiv.style.display = 'block';
        if(hospitalEditDiv.style.display = 'block'){
            hospitalEditDiv.style.zIndex = "200";
            showOverlay();
        }
    }
  }

  // FILLS DEPARTMENT DATA IN THE DIV 
  function fetchHospitalDepartments() {
    fetch (`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}/departments`, {
    headers: {
      ...getAuthHeaders(),
    },
    })
    .then(response => response.json())
    .then(hospitalDepartmentData => {
      console.log('Departments fetched:', hospitalDepartmentData);

      // Clear previous departments
      const departmentContainer = document.getElementById('department_description');
      departmentContainer.innerHTML = ''; // Clear old content

      hospitalDepartmentData.forEach(department => {
        // Create a new div for each department
        const departmentDiv = document.createElement('div');
        departmentDiv.classList.add('department_div');
        departmentDiv.style.border = "1px solid #B8B8B8";
        departmentDiv.style.margin = "1%";
        departmentDiv.style.borderRadius = "8px";
        departmentDiv.style.overflow = "auto";

        // Create new elements for department name and description
        const departmentName = document.createElement('div');
        departmentName.classList.add('dept_name');
        departmentName.textContent = department.name;
        departmentName.style.color = "#898989";
        departmentName.style.padding = "1%";
        departmentName.style.margin = "1%";

        const departmentDescription = document.createElement('div');
        departmentDescription.classList.add('dept_description');
        departmentDescription.textContent = department.description;

        // Append the name and description to the department div
        departmentDiv.appendChild(departmentName);
        departmentDiv.appendChild(departmentDescription);

        // Append the department div to the main container
        departmentContainer.appendChild(departmentDiv);
      });
    })
    .catch(error => console.error("Error fetching departments:", error));
  }


  //FETCHES ALL DEPARTMENTS TO ADD TO HOSPITALS.
  const departmentSelect = document.getElementById("dept_select");
  let departmentId;

  function fetchDepartments() {
    fetch ("http://0.0.0.0:5000/api/v1/departments", {
    headers: {
      ...getAuthHeaders(),
    },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Departments fetched:', data);
      data.forEach(department => {
        const option = document.createElement("option");
        option.value = department.id; 
        option.innerText = department.name;
        departmentSelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching departments:", error));
  }
  console.log('finished fetching department')
  fetchDepartments();

  departmentSelect.addEventListener("change", function() {
    departmentId = this.value;
  });

  // FUNCTION THAT CREATES NEW HOSPITAL DEPARTMENT
  function createNewHospitalDepartment() {
       
    const hopitalDepartmentData = {
      department_id: departmentId,
    };
    
    const jsonData = JSON.stringify(hopitalDepartmentData);
  
    const request = new Request(`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}/departments`, {
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
        hideDepartmentsDiv();
        //hideOverlay1();
        //hideHospitalStatusDiv();
        showFeedbackDiv();
        console.log("this is", jsonData);
        const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
        const message = jsonData.Message;
        // console.log(message);
        confirmationTextDiv.textContent = message;
    })
    .catch(error => {
        const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
        confirmationTextDiv.textContent = "Error while adding a new department to hospital. Check to make sure you're connected to the internet"; 
    });
  }
  const newDeptButton = document.getElementById('update_hospital_department_');
  newDeptButton.addEventListener('click', () => {
    createNewHospitalDepartment();
  });


  function hideEditHospitalDiv() {
    const hospitalEditDiv = document.getElementById('edit_hospital_status_div');
    const computedStyle = window.getComputedStyle(hospitalEditDiv);
    if (computedStyle.display === "block") {
        hospitalEditDiv.style.display = 'none';            
    }
  }

  const editHospitalProfile = document.getElementById('edit_hospital_button');
  editHospitalProfile.addEventListener('click', () => {
    showEditHospitalDiv();
    updateHospitalEditDiv(window.location.hospitalDetails, hospitalData);
  });

  const closeEditHospitalProfile = document.getElementById('edit_hospital_exit_div');
  closeEditHospitalProfile.addEventListener('click', () => {
    hideEditHospitalDiv();
  });

  
  //FETCHES ALL counties TO UPDATE HOSPITALS TO
  const countySelect = document.getElementById("county_select");
  let newCountyId;

  function fetchHospitals() {
  fetch ("http://0.0.0.0:5000/api/v1/counties", {
    headers: {
        ...getAuthHeaders(),
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Counties fetched:', data);
    data.forEach(county => {
        const option = document.createElement("option");
        
        option.value = county.id; 
        option.innerText = county.name;
        countySelect.appendChild(option);
    });
    })
    .catch(error => console.error("Error fetching county:", error));
  }
  console.log('finished fetching countys')
  fetchHospitals();

  countySelect.addEventListener("change", function() {
    newCountyId = this.value;
  });

  function updateHospitalEditDiv() {
    const hospitalStatusDiv = document.getElementById('hospital_profile_edit');
    console.log(hospitalData);
    console.log(hospitalDetails.id);
    
    const headerText = document.getElementById('hospital_edit_id');
    headerText.textContent = `Hospital Id: ${hospitalDetails.id}`;
    
    const hospitalNameElem = document.getElementById('edit_hosp_name');
    hospitalNameElem.value = hospitalDetails.name || 'N/A';
    
    const hospitalDescriptionElem = document.getElementById('edit_hospital_email');
    hospitalDescriptionElem.value = hospitalDetails.email;
    
    const telephoneElem = document.getElementById('edit_phone_number');
    telephoneElem.value = hospitalDetails.telephone_no || 'N/A';
    
    const latitudeElem = document.getElementById('edit_latitude');
    latitudeElem.value = hospitalDetails.latitude || 'N/A';

    const longitudeElem = document.getElementById('edit_longitude');
    longitudeElem.value = hospitalDetails.longitude || 'N/A';

    const profileBioElem = document.getElementById('input_profile_info_div');
    profileBioElem.value = hospitalDetails.description || 'N/A';
  }

  // FEEDBACK DIVS
  function showFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "block";
    feedbackDiv.style.zIndex = "351";
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
  function updateHospital() {

    
    const originalHospitalData = {
        name: document.getElementById('edit_hosp_name').value,
        email: document.getElementById('edit_hospital_email').value,
        telephone_no: document.getElementById('edit_phone_number').value,
        longitude: document.getElementById('edit_longitude').value,
        latitude: document.getElementById('edit_latitude').value,
        description: document.getElementById('input_profile_info_div').value,
    };
    
    const changedData = {};
    Object.keys(originalHospitalData).forEach(key => {
        if (originalHospitalData[key] !== hospitalDetails[key]) {
            changedData[key] = originalHospitalData[key];
        }
    });

    if (Object.keys(changedData).length === 0) {
        alert('No changes detected');
        return;
    }
    
    const jsonData = JSON.stringify(changedData);
    console.log(changedData);
    

    const request = new Request(`http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`, {
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
        hideEditHospitalDiv();
        showFeedbackDiv();
        console.log(jsonData);
        const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
        const message = jsonData.Message;
        console.log(message);
        confirmationTextDiv.textContent = message;
    })
    .catch(error => alert(error));
  }
  
  const updateHospitalButton = document.getElementById('update_hospital_profile_button');
  updateHospitalButton.addEventListener('click', () => {
    hideHospitalStatusDiv();
    updateHospital(hospitalId);
  });

  const addPatientButton = document.getElementById('add_patient_button');
  addPatientButton.addEventListener('click', () => {
    showNewUserEditDiv();
    showOverlay();
  });
/*
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
*/
  function createUser() {
    
    const originalUserData = {
        first_name: document.getElementById('patient_first_name').value,
        last_name: document.getElementById('patient_last_name').value,
        date_of_birth: document.getElementById('edit_date_of_birth').value,
        hospital_id: hospitalId,
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

  
  const countyNameSelect = document.getElementById("county_select");
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
          countyNameSelect.appendChild(option);
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


