document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/doctors'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let doctorData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
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


    

    const searchInput = document.getElementById('search_input');
    const searchButton = document.getElementById('search_button');

    

    // Function to display docor for the current page
    function displayCurrentPage() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageDoctor = doctorData.slice(startIndex, endIndex);

        // Clear existing table rows before adding new ones
        tableBody.innerHTML = '';

        // Loop through counties for the current page and populate table rows
        currentPageDoctor.forEach(doctor => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
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
            doctor.first_name.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredDoctors.forEach(doctor => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
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

// A FUNCTION TO SELECT COUNTY IN WHICH TO ADD HOSPITAL OBJECT TO IT.
const countySelect = document.getElementById("county_select");
const constituencySelect = document.getElementById("constituency_select");
const townSelect = document.getElementById("town_select");
const hospitalSelect = document.getElementById("hospital_select");

// Function to fetch counties data from the API endpoint
function fetchCounties() {
  fetch("http://0.0.0.0:5000/api/v1/counties")
    .then(response => response.json())
    .then(data => {
      data.forEach(county => {
        const option = document.createElement("option");
        option.value = county.id; 
        option.innerText = county.name;
        countySelect.appendChild(option);
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

//FUNCTION TO FETCH WARD BASED ON CONSTITUENCY
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

// Event listeners for county selection change and constituency selection change.
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


function showAddNewDoctor() {
    const showAddNewForm = document.getElementById('new_doctor');
  
     
    if (showAddNewForm.style.display === 'none') {
      showAddNewForm.style.display = 'block';
    } else {
      showAddNewForm.style.display = 'none';
    }
  } window.onload = showAddNewHospital();
  
  document.addEventListener("DOMContentLoaded", function() {
    showAddNewHospital();
});