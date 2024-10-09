document.addEventListener('DOMContentLoaded', () => {

    const requestAppointments = 'http://0.0.0.0:5000/api/v1/appointments';
    const pageSize = 10;
    let currentPage = 1;
    const tableBody = document.getElementById('myAppointmentTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');
    appointmentData = [];

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    function fetchAppointments() {
        fetch(requestAppointments, { headers: getAuthHeaders()})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("appointment Data", data);
                appointmentData = data;
                displayCurrentPage();
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
  
    const searchAppointmentInput = document.getElementById('search_input_home');
    const searchAppointmentButton = document.getElementById('search_button_home');
  
  
    function displayCurrentPage() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageAppointments = appointmentData.slice(startIndex, endIndex);
  
        tableBody.innerHTML = '';
  
        currentPageAppointments.forEach(appointment => {
            const tableRow = document.createElement("tr");
  
            let statusColor = '';
            if (appointment.appointment_status === 'Pending Confirmation') {
              statusColor = 'red';
            } else if (appointment.appointment_status === 'Confirmed') {
              statusColor = 'green';
            } else if (appointment.appointment_status === 'Cancelled') {
                statusColor = '#FFA500';
            } else {
                statusColor = '#2A00C7';
            }
  
            fetch(`http://0.0.0.0:5000/api/v1/user/${appointment.user_id}`, { headers: getAuthHeaders()})
            .then(response => response.json())
            .then(patientData => {
              const patientName = `${patientData.first_name} ${patientData.last_name}`;
        
  
              fetch(`http://0.0.0.0:5000/api/v1/doctor/${appointment.doctor_id}`, { headers: getAuthHeaders()})
                .then(response => response.json())
                .then(doctorData => {
                    console.log(doctorData);
                const doctorName = `${doctorData.first_name} ${doctorData.last_name}`;

                const formattedDate = new Date(appointment.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  });
  
                    tableRow.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td>${appointment.id}</td>
                        <td>${patientName}</td>
                        <td>${doctorName}</td>
                        <td>${formattedDate}</td>
                        <td>${appointment.time}</td> 
                        <td style="color: ${statusColor};">${appointment.appointment_status}</td>
                        <td>${appointment.description}</td> 
                    `;
                    tableBody.appendChild(tableRow);
                })
                .catch(error => console.error("Error fetching patient:", error));
            })
            .catch(error => console.error("Error fetching patient:", error));
        });
  
        pageNumSpan.textContent = currentPage;
  
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= appointmentData.length;
    }
    fetchAppointments();
  
  
    searchAppointmentButton.addEventListener('click', () => {
        const searchTerm = searchAppointmentInput.value.trim().toLowerCase();
  
        const filteredAppointments = appointmentData.filter(appointment =>
            appointment.appointment_status.toLowerCase().includes(searchTerm) ||
            appointment.id.toLowerCase().includes(searchTerm)
        );
  
        tableBody.innerHTML = '';
        filteredAppointments.forEach(appointment => {
            const tableRow = document.createElement("tr");
    
            let statusColor = '';
            if (appointment.appointment_status === 'Pending Confirmation') {
                statusColor = 'red';
            } else if (appointment.appointment_status === 'Confirmed') {
                statusColor = 'green';
            } else if (appointment.appointment_status === 'Cancelled') {
                statusColor = '#FFA500';
            } else {
                statusColor = '#2A00C7';
            }
    
    
                fetch(`http://0.0.0.0:5000/api/v1/user/${appointment.user_id}`)
                .then(response => response.json())
                .then(patientData => {
                const patientName = `${patientData.first_name} ${patientData.last_name}`;
            
    
                fetch(`http://0.0.0.0:5000/api/v1/doctor/${appointment.doctor_id}`)
                    .then(response => response.json())
                    .then(doctorData => {
                    const doctorName = `${doctorData.first_name} ${doctorData.last_name}`;

                    const formattedDate = new Date(appointment.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                        });  
    
                        tableRow.innerHTML = `
                            <td><input type="checkbox"></td>
                            <td>${appointment.id}</td>
                            <td>${patientName}</td>
                            <td>${doctorName}</td>
                            <td>${formattedDate}</td>
                            <td>$${appointment.time}</td> 
                            <td style="color: ${statusColor};">${appointment.appointment_status}</td>
                            <td>${appointment.description}</td> 
                        `;
                        tableBody.appendChild(tableRow);
                    })
                    .catch(error => console.error("Error fetching patient:", error));
                })
                .catch(error => console.error("Error fetching patient:", error));
        });

        searchAppointmentInput.value = '';
    });
    
  
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(appointmentData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });

    function fetchAppointmentDetails(appointmentId) {
        const appointmentDetailsUrl = `http://0.0.0.0:5000/api/v1/appointment/${appointmentId}`;
        return fetch(appointmentDetailsUrl, { headers: getAuthHeaders() })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
    
    function fetchRelatedData(patientId, doctorId) {
        return Promise.all([
            fetch(`http://0.0.0.0:5000/api/v1/user/${patientId}`, { headers: getAuthHeaders() }).then(response => response.json()),
            fetch(`http://0.0.0.0:5000/api/v1/doctor/${doctorId}`, { headers: getAuthHeaders() }).then(response => response.json()),
        ]);
    }
    
    function updateAppointmentStatusDiv(appointmentDetails, patientData, doctorData) {
        const appointmentStatusDiv = document.getElementById('appointment_status_div');
        
        document.getElementById('appointment_id_id').textContent = `Appointment Id: ${appointmentDetails.id}`;

        const medicationNameElem = document.getElementById('appointment_date');
        medicationNameElem.textContent = appointmentDetails.date || 'N/A';        
                
        const appointmentQuantityElem = document.getElementById('appointment_time');
        appointmentQuantityElem.textContent = appointmentDetails.time;
        
        const appointmentDescriptionElem = document.getElementById('appointment_details_info');
        appointmentDescriptionElem.textContent = appointmentDetails.description;
        
        const patientNameElem = document.getElementById('patient_name');
        patientNameElem.textContent = `${patientData.first_name} ${patientData.last_name}`;
        
        const doctorNameElem = document.getElementById('doctor_name');
        doctorNameElem.textContent = `${doctorData.first_name} ${doctorData.last_name}`;
        
        const placedAtElem = document.getElementById('placed_at');
        const formattedPlacedAt = new Date(appointmentDetails.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        placedAtElem.textContent = formattedPlacedAt;
        
        const updatedAtElem = document.getElementById('updated_at');
        const formattedUpdatedAt = new Date(appointmentDetails.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        updatedAtElem.textContent = formattedUpdatedAt;
        
        const appointmentStatus = document.getElementById('option_select_1');
        const appointmentSelect = document.getElementById('appointment_select');
        appointmentStatus.textContent = appointmentDetails.appointment_status;

        const status = appointmentDetails.appointment_status.trim().toLowerCase(); 
        if (status === 'confirmed') {
            appointmentSelect.style.backgroundColor = '#B3FFB3'; 
        } else if (status === 'no-show') {
            appointmentSelect.style.backgroundColor = '#C3B3FF';
        } else if (status === 'cancelled') {
            appointmentSelect.style.backgroundColor = 'red';
        } else {
            appointmentSelect.style.backgroundColor = '#FFBABA';
        }
        
    }
    
    function showAppointmentStatusDiv() {
        const appointmentStatusDiv = document.getElementById('appointment_status_div');
        const computedStyle = window.getComputedStyle(appointmentStatusDiv);
        if (computedStyle.display === "none") {
            appointmentStatusDiv.style.display = 'block';
            if(appointmentStatusDiv.style.display = 'block'){
                appointmentStatusDiv.style.zIndex = "200";
                showOverlay();
            }
        }
    }

    function hideAppointmentStatusDiv() {
        const appointmentStatusDiv = document.getElementById('appointment_status_div');
        const appointmentSelect = document.getElementById('appointment_select');
        const computedStyle = window.getComputedStyle(appointmentStatusDiv);
        if (computedStyle.display === "block") {
            appointmentStatusDiv.style.display = 'none';
            appointmentSelect.selectedIndex = 0;
        }
    }
    function hideOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'block') {
          overlayDiv.style.display = 'none';
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

    const myButton = document.getElementById('appointment_exit_div');
            myButton.addEventListener('click', () => {
                hideAppointmentStatusDiv();
                hideOverlay();
            });
    
    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;
        const clickedRow = event.target.closest('tr');
        if (!clickedRow) return;
        appointmentId = clickedRow.cells[1].textContent;

        
        fetchAppointmentDetails(appointmentId)
            .then(appointmentDetails => {
                const patientId = appointmentDetails.user_id;
                const doctorId = appointmentDetails.doctor_id;
                
    
            return fetchRelatedData(patientId, doctorId).then(([patientData, doctorData]) => {
            updateAppointmentStatusDiv(appointmentDetails, patientData, doctorData);
                    showAppointmentStatusDiv();
                });
            })
            .catch(error => {
                console.error("Error fetching appointment details or related data:", error);
            });
    });

    function updateAppointment() {
        if (!appointmentId) {
        alert("Appointment ID is not available. Please select an appointment first.");
        return;
        }

        const selectedOption1 = document.getElementById('option_select_2').value;
        const selectedOption2 = document.getElementById('option_select_3').value;
        const selectedOption3 = document.getElementById('option_select_4').value;
        let selectedOption;

        console.log(selectedOption);
        
        if (selectedOption === "") {
            alert("Please select a valid appointment status.");
            return;
        }

        if(selectedOption1 === "Confirmed") {
            selectedOption = selectedOption1;
        } else if(selectedOption2 === "Cancelled"){
            selectedOption = selectedOption2;
        } else if(selectedOption3 === "No-show"){
            selectedOption = selectedOption2;
        } else{
            alert("Please select a valid appointment status");
            return;
        }

        
        const appointmentData = {
            appointment_status: selectedOption,
        };
        
        
        const jsonData = JSON.stringify(appointmentData);

        console.log(appointmentData);
        
    
        const request = new Request(`http://0.0.0.0:5000/api/v1/appointment/${appointmentId}`, {
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
                throw new Error(`Error updating appointment: ${response.statusText}`);
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
        hideAppointmentStatusDiv();
        updateAppointment();
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
});