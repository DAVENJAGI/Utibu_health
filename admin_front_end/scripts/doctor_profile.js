const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('doctorId');

document.addEventListener('DOMContentLoaded', () => {

  const customToken = localStorage.getItem('X-Custom-Token');
  function getAuthHeaders() {
    return {
      'X-Custom-Token': customToken
    };
  }
    
  
    const requestDoctor = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}`;
    const requestDoctorPatients = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}/patients`;
    const requestDoctorOrders = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}/orders`;
    const pageSize = 10;
    let currentPage = 1;
    let doctorData = [];
    
    // DOM elements
    const tableBody = document.getElementById('myPatientTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');


    fetch(requestDoctor, { headers: getAuthHeaders() })
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
            return fetch(requestHospital, { headers: getAuthHeaders() });
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
        fetch(requestDoctorPatients, { headers: getAuthHeaders() })
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

    const searchInput = document.getElementById('search_input');
    const searchButton = document.getElementById('search_button');


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
                <td><input type="checkbox"></td>
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
                <td><input type="checkbox"></td> 
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
    fetch("http://0.0.0.0:5000/api/v1/diseases", { headers: getAuthHeaders() })
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



/*A FUNCTION THAT CREATES NEW Patient */
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
    
    fetch(request, { headers: getAuthHeaders() })
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



document.addEventListener('DOMContentLoaded', () => {
  
  const requestDoctorOrders = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}/orders`;
  const pageSize = 10;
  let currentPage = 1;
  
  // DOM elements
  const tableBody = document.getElementById('myOrderTable').getElementsByTagName('tbody')[0];
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const pageNumSpan = document.getElementById('page-num');


  

  // STARTING TO FETCH DOCTOR ORDERS
  function fetchDoctorOrders() {
      fetch(requestDoctorOrders, { headers: getAuthHeaders() })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              orderData = data;
              displayCurrentPage();
          })
          .catch(error => {
              console.error("Error fetching data:", error);
          });
  }

  const searchOrderInput = document.getElementById('search_order_input');
  const searchOrderButton = document.getElementById('search_order_button');


  function displayCurrentPage() {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentPageOrders = orderData.slice(startIndex, endIndex);

      tableBody.innerHTML = '';

      currentPageOrders.forEach(order => {
          const tableRow = document.createElement("tr");

          let statusColor = '';
          if (order.order_status === 'pending approval') {
            statusColor = 'red';
          } else if (order.order_status === 'approved') {
            statusColor = 'green';
          }

          fetch(`http://0.0.0.0:5000/api/v1/user/${order.user_id}`, { headers: getAuthHeaders() })
          .then(response => response.json())
          .then(patientData => {
            const patientName = `${patientData.first_name} ${patientData.last_name}`;
      

            fetch(`http://0.0.0.0:5000/api/v1/medication/${order.medication_id}`, { headers: getAuthHeaders() })
            .then(response => response.json())
            .then(medicationData => {
              const medicationName = medicationData.name;

              const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })

              tableRow.innerHTML = `
                  <td><input type="checkbox"></td>
                  <td>${order.id}</td>
                  <td>${patientName}</td>
                  <td>${medicationName}</td>
                  <td>${order.quantity}</td>
                  <td style="color: ${statusColor};">${order.order_status}</td>
                  <td>$${order.billing_cost}</td> 
                  <td>${formattedDate}</td>     
                  <td>${order.delivery_mode}</td>             
              `;
              tableBody.appendChild(tableRow);
            })
            .catch(error => console.error("Error fetching medication:", error));
          })
          .catch(error => console.error("Error fetching patient:", error));
      });

      pageNumSpan.textContent = currentPage;

      prevButton.disabled = currentPage === 1;
      nextButton.disabled = endIndex >= orderData.length;
  }
  fetchDoctorOrders();


  searchOrderButton.addEventListener('click', () => {
      const searchTerm = searchOrderInput.value.trim().toLowerCase();

      // Filter counties data based on search term
      const filteredOrders = orderData.filter(order =>
          order.order_status.toLowerCase().includes(searchTerm)
      );

      tableBody.innerHTML = '';
      filteredOrders.forEach(order => {
          const tableRow = document.createElement("tr");

          let statusColor = '';
          if (order.order_status === 'pending approval') {
            statusColor = 'red';
          } else if (order.order_status === 'approved') {
            statusColor = 'green';
          }


          fetch(`http://0.0.0.0:5000/api/v1/user/${order.user_id}`, getAuthHeaders())
          .then(response => response.json())
          .then(patientData => {
            const patientName = `${patientData.first_name} ${patientData.last_name}`;
      

            fetch(`http://0.0.0.0:5000/api/v1/medication/${order.medication_id}`, getAuthHeaders())
            .then(response => response.json())
            .then(medicationData => {
              const medicationName = medicationData.name;


              tableRow.innerHTML = `
                  <td><input type="checkbox"></td>
                  <td>${order.id}</td>
                  <td>${patientName}</td>
                  <td>${medicationName}</td>
                  <td>${order.quantity}</td>
                  <td style="color: ${statusColor};">${order.order_status}</td>
                  <td>$${order.billing_cost}</td>                  
              `;
              tableBody.appendChild(tableRow);
            })
            .catch(error => console.error("Error fetching medication:", error));
          })
          .catch(error => console.error("Error fetching patient:", error));
      });

      // Clear search input
      searchOrderInput.value = '';
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

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('side_calendar');
  const requestDoctorAppointments = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}/appointments`;


fetch(requestDoctorAppointments, { headers: getAuthHeaders() })
  .then(response => response.json())
  .then(data => {
    
    console.log("Appoinment data", data);
    const events = data.map(appointment => ({
      title: appointment.description,
      start:  appointment.date + 'T' + appointment.time,
      location: 'Zoom Call'
    }));

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      events: events,
    });
    calendar.render();
  


  calendarEl.style.width = '50vh' ;
  calendarEl.style.height = '37vh' ;

 
  var today = new Date();
  today.setHours(0, 0, 0, 0);
    // var dateOnly = today.toLocaleDateString();
  // console.log(dateOnly);

  
  var dayEvent = calendarEl.querySelectorAll('.fc-daygrid-event-harness');
  
  dayEvent.forEach(function(cell) {
    cell.style.background = '#FFA500';
    cell.style.color = "white";
/*
    if (futureDate) {
      cell.style.background = '#00D9FF';
      cell.style.color = "white";
    }*/
  })
  

  var dayToday = calendarEl.querySelector('.fc-daygrid-day.fc-day-today');

  if (dayToday) {
    dayToday.style.background = '#1a6860';
    dayToday.style.color = "white";
  }
  

  var viewHarness = calendarEl.querySelector('.fc-view-harness');

  if (viewHarness) {
    viewHarness.style.width = '50vh';
    viewHarness.style.height = "30vh";
  }

  var headerCell = calendarEl.querySelectorAll('.fc-col-header-cell.fc-day');

  headerCell.forEach(function(cell) {
    cell.style.background = '#1a6860';
    cell.style.borderBottom = '#1a6860';
    cell.style.color = "white";
    cell.style.width = "76px";
    cell.style.height = "45px";
    cell.style.border = "1px solid #1a6860";
    cell.style.textAlign = "center";
    cell.style.zIndex = "10";
    cell.style.margin = "0px";
  });

  
  var tableHarness = calendarEl.querySelector('.fc-scrollgrid');

  if (tableHarness) {
    tableHarness.style.margin = '1px';
    tableHarness.style.width = '49.5vh';
    tableHarness.style.height = "31.5vh";
  }

  var tableHeight = calendarEl.querySelector('.fc-daygrid-body.fc-daygrid-body-unbalanced');

  if (tableHeight) {
    tableHeight.style.borderTop = '1px solid #cfcfcf';
    tableHeight.style.width = '49.5vh';
    tableHeight.style.height = "25vh";
    
  }
   
  var syncTable = calendarEl.querySelector('.fc-scrollgrid-sync-table');

  if (syncTable) {
    // tableHeight.style.margin = '1px';
    syncTable.style.maxWidth = '49vh';
    syncTable.style.maxHeight = '24vh';
    syncTable.style.marginLeft = '2px';
  }
  var tableDataCells = calendarEl.querySelectorAll('.fc-daygrid-day');

  tableDataCells.forEach(function(cell) {
    // cell.style.position = 'relative';
    cell.style.width = '68px';
    cell.style.marginRight = '1%';
    cell.style.maxHeight = '20px';
  });

  // After rendering, manipulate the buttons
  var prevButton = calendarEl.querySelector('.fc-prev-button');
  var nextButton = calendarEl.querySelector('.fc-next-button');
  var todayButton = calendarEl.querySelector('.fc-today-button');

  var titleText = calendarEl.querySelector('.fc-toolbar-title');

  if (titleText) {
    titleText.style.color = '#1a6860';
    titleText.style.fontSize = "19px";
  }

  var titleTop = calendarEl.querySelector('.fc-toolbar');
  if (titleTop) {
    titleTop.style.boxShadow = '1px 1px 8px #cfcfcf';
    titleTop.style.border = "1px solid #cfcfcf";
    titleTop.style.marginBottom = "0px";
  }
/*
  var wholeTable1 = calendarEl.querySelector('.fc-scroller-harness');
  if (wholeTable1) {
    wholeTable1.style.background = '#1a6860';
    wholeTable1.style.height = '15px';
    wholeTable1.style.zIndex = '15';
  }*/
  
  var wholeTable = calendarEl.querySelector('.fc-scroller');
  if (wholeTable) {
    wholeTable.style.background = '#1a6860';
    wholeTable.style.height = "15px";
    wholeTable.style.overflow = "hidden";
  }


  if (prevButton) {
    prevButton.style.backgroundColor = '#1a6860';
    prevButton.style.margin = '3px';
    prevButton.style.border = 'solid 1px #1a6860';
    prevButton.style.borderRadius = '4px'; 
  }

  if (nextButton) {
    nextButton.style.backgroundColor = '#1a6860';
    nextButton.style.margin = '3px';
    nextButton.style.border = 'solid 1px #1a6860';
    nextButton.style.borderRadius = '4px'; 
  }

  if (todayButton) {
    todayButton.style.backgroundColor = '#1a6860';
    todayButton.style.margin = '3px';
    todayButton.style.border = 'solid 1px #1a6860';
    todayButton.style.borderRadius = '4px'; 
  }
  
  var dayGridMonthButton = calendarEl.querySelector('.fc-dayGridMonth-button');
    if (dayGridMonthButton) {
        dayGridMonthButton.style.backgroundColor = '#1a6860';
        dayGridMonthButton.style.marginRight = '3px';
        dayGridMonthButton.style.border = 'solid 1px #1a6860'; 
        dayGridMonthButton.style.borderRadius = '4px'; 
    }

    var dayGridWeekButton = calendarEl.querySelector('.fc-dayGridWeek-button');
    if (dayGridWeekButton ) {
        dayGridWeekButton.style.backgroundColor = '#1a6860';
        dayGridWeekButton.style.marginRight = '3px';
        dayGridWeekButton.style.border = 'solid 1px #1a6860'; 
        dayGridWeekButton.style.borderRadius = '4px'; 
    }

    var dayGridDayButton = calendarEl.querySelector('.fc-dayGridDay-button');
    if (dayGridDayButton) {
        dayGridDayButton.style.backgroundColor = '#1a6860';
        dayGridDayButton.style.marginRight = '3px';
        dayGridDayButton.style.border = 'solid 1px #1a6860'; 
        dayGridDayButton.style.borderRadius = '4px'; 
    }

    
  });

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