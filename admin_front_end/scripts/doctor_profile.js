document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('doctorId');

    const requestDoctor = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}`;
    const requestDoctorPatients = `http://0.0.0.0:5000/api/v1/doctor/${doctorId}/patients`;
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let doctorData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');


    fetch(requestDoctor)
        .then(response => response.json())
        .then(data => {
            console.log("Doctor API data:", data);
            
            const firstName = document.getElementById('first_name');
            const lastName = document.getElementById('last_name');
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
