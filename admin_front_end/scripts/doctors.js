document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/doctors'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let doctorData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myDoctorTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    // Function to fetch all counties data
    function fetchAllDoctors() {
        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                doctorData = data; // Store all counties data
                displayCurrentPage(); // Display initial page
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
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${doctor.id}</td>
                <td>${doctor.first_name}</td>
                <td>${doctor.last_name}</td>
                <td>${doctor.email}</td>
                <td>${doctor.license_no}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Update the page number displayed
        pageNumSpan.textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= doctorData.length;
    }

    fetchAllDoctors();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter counties data based on search term
        const filteredDoctors = doctorData.filter(doctor =>
            doctor.first_name.toLowerCase().includes(searchTerm) ||
            doctor.last_name.toLowerCase().includes(searchTerm) ||
            doctor.email.toLowerCase().includes(searchTerm) ||
            doctor.id.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredDoctors.forEach(doctor => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${doctor.id}</td>
                <td>${doctor.first_name}</td>
                <td>${doctor.last_name}</td>
                <td>${doctor.email}</td>
                <td>${doctor.license_no}</td>
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
        if (currentPage < Math.ceil(doctorData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });

    tableBody.addEventListener('click', (event) => {
      if (event.target.tagName !== 'TD') return;

      const clickedRow = event.target.parentNode;
      const doctorId = clickedRow.cells[1].textContent;

      window.location.href = `doctor_profile.html?doctorId=${doctorId}`;
  });



});