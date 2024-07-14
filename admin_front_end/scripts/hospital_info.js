document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('hospitalId');


    const requestUrl = `http://0.0.0.0:5000/api/v1/hospital/${hospitalId}/doctors`; // Replace with your actual API endpoint
    const requestHospital = `http://0.0.0.0:5000/api/v1/hospital/${hospitalId}`; 
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let doctorData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');


    fetch(requestHospital)
        .then(response => response.json())
        .then(data => {
            console.log("API data:", data);
            
            const hospitalName = document.getElementById('name_data');
            const hospitalEmail = document.getElementById('hospital_email');
            const hospitalLogitude = document.getElementById('hosp_longitude');
            const hospitalLatitude = document.getElementById('hosp_latitude');
            
            
      
            hospitalName.textContent = data.name;
            hospitalEmail.textContent = data.email;
            hospitalLogitude.textContent = data.longitude;
            hospitalLatitude.textContent = data.latitude;

            const requestTown = `http://0.0.0.0:5000/api/v1/ward/${data.town_id}`;
            return fetch(requestTown);
        })
        .then(response => response.json())
        .then(townData => {
          console.log("Town API data:", townData);

          const hospitalTown = document.getElementById('town_name');
          hospitalTown.textContent = townData.town_name;

          const requestConstituency = `http://0.0.0.0:5000/api/v1/constituency/${townData.constituency_id}`;
          return fetch(requestConstituency);

        })
        .then(response => response.json())
        .then(constituencyData => {
          console.log("Constituency API data:", constituencyData);

          const hospitalConstituency = document.getElementById('const_name');
          hospitalConstituency.textContent = constituencyData.constituency_name;

          const requestCounty = `http://0.0.0.0:5000/api/v1/county/${constituencyData.county_id}`;
          return fetch(requestCounty);
        })
        .then(response => response.json())
        .then(countyData => {
          console.log("County API data:", countyData);

          const hospitalCounty = document.getElementById('county_name');
          hospitalCounty.textContent = countyData.name;
        })
        


        .catch(error => {
            console.error("Error fetching data:", error);
        });
    

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
                doctorData = data;
                const doctorNumber = doctorData.length;
                const doctorInHospital = document.getElementById('dkt_num');
                doctorInHospital.textContent = doctorNumber;
                console.log(doctorNumber);
                displayCurrentPage();
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }


    

    

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


    const searchInput = document.getElementById('search_input');
    const searchButton = document.getElementById('search_button');



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