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
            appointment.appointment_status.toLowerCase().includes(searchTerm)
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
                            <td>$${appointment.description}</td> 
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

    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;

        const clickedRow = event.target.parentNode;
        const appointmentsId = clickedRow.cells[1].textContent;

        window.location.href = `appointment_profile.html?appointmentId=${appointmentsId}`;
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
});