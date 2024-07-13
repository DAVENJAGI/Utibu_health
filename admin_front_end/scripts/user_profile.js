document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    const requestUser = `http://0.0.0.0:5000/api/v1/user/${userId}`; 
    const requestDiseases = `http://0.0.0.0:5000/api/v1/user/${userId}/disease`;
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let doctorData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');


    fetch(requestUser)
        .then(response => response.json())
        .then(data => {
            console.log("User API data:", data);
            
            const firstName = document.getElementById('first_name');
            const lastName = document.getElementById('last_name');
            const userEmail = document.getElementById('usr_email');
            const dateOfBirth = document.getElementById('date_of_birth');
            
      
            firstName.textContent = data.first_name;
            lastName.textContent = data.last_name
            userEmail.textContent = data.email;
            dateOfBirth.textContent = data.date_of_birth;
            
            const requestDoctor = `http://0.0.0.0:5000/api/v1/doctor/${data.doctor_id}`;
            return fetch(requestDoctor);
        })
        .then(response => response.json())
        .then(doctorData => {
          console.log("Doctor API data:", doctorData);
          const assignedDoctor = document.getElementById('assigned_doctor');

          assignedDoctor.textContent = `${doctorData.first_name} ${doctorData.last_name}`;

        })

        .catch(error => {
            console.error("Error fetching data:", error);
        });
    

    // STARTING TO FETCH DISEASE
    function fetchAllDiseases() {
        fetch(requestDiseases)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("User disease data", data);
                diseaseData = data;
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
        const currentPageDisease = diseaseData.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        currentPageDisease.forEach(disease => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${disease.name}</td>
                <td>${disease.description}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        pageNumSpan.textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= diseaseData.length;
    }
    fetchAllDiseases();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredDiseases = diseaseData.filter(disease =>
            disease.name.toLowerCase().includes(searchTerm)
        );

        tableBody.innerHTML = '';
        filteredDiseases.forEach(disease => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${disease.id}</td>
                <td>${disease.name}</td>
                <td>${disease.description}</td>
            `;
            tableBody.appendChild(tableRow);
        });
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
