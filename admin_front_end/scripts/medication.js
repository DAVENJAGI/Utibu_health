document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/medications'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let medicationData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myMedicationTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }
   
    function fetchAllMedications() {
        fetch(requestUrl, { headers: getAuthHeaders()})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                medicationData = data;
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
        const currentPageMedication = medicationData.slice(startIndex, endIndex);

        // Clear existing table rows before adding new ones
        tableBody.innerHTML = '';

        // Loop through counties for the current page and populate table rows
        currentPageMedication.forEach(medication => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox"></td>    
                <td>${medication.id}</td>
                <td>${medication.name}</td>
                <td>${medication.description}</td>
                <td>${medication.in_stock}</td>
                <td>${medication.dosage}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Update the page number displayed
        pageNumSpan.textContent = currentPage;

        // Disable buttons if on first or last page
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= medicationData.length;
    }

    // Fetch all counties data when DOM is loaded
    fetchAllMedications();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter counties data based on search term
        const filteredMedications = medicationData.filter(medication =>
            medication.name.toLowerCase().includes(searchTerm) ||
            medication.id.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredMedications.forEach(medication => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${medication.id}</td>
            <td>${medication.name}</td>
            <td>${medication.description}</td>
            <td>${medication.in_stock}</td>
            <td>${medication.dosage}</td>
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
        if (currentPage < Math.ceil(medicationData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });
});
