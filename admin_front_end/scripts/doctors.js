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
                <td>${doctor.availability}</td>
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
                <td>${doctor.availability}</td>
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
                    <td>${doctor.availability}</td>
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


});