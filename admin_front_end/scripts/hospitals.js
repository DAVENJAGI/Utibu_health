document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/hospitals'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let hospitalData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    // Function to fetch all counties data
    function fetchAllHospitals() {
        fetch(requestUrl)
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


    

    const searchInput = document.getElementById('search_input');
    const searchButton = document.getElementById('search_button');

    

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

        // Filter counties data based on search term
        const filteredHospitals = hospitalData.filter(hospital =>
            hospital.name.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredHospitals.forEach(hospital => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${hospital.id}</td>
                <td>${hospital.name}</td>
                <td>${hospital.email}</td>
                <td>${hospital.longitude}</td>
                <td>${hospital.latitude}</td>
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
        if (currentPage < Math.ceil(hospitalData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });
});
