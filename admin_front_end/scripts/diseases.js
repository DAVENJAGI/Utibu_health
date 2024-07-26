document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/diseases'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let diseaseData = []; // Array to store all counties data

    // DOM elements
    const tableBody = document.getElementById('myDiseaseTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    // Function to fetch all counties data
    function fetchAllDiseases() {
        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                diseaseData = data;
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
        const currentPageDisease = diseaseData.slice(startIndex, endIndex);

        // Clear existing table rows before adding new ones
        tableBody.innerHTML = '';

        // Loop through counties for the current page and populate table rows
        currentPageDisease.forEach(disease => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${disease.id}</td>
                <td>${disease.name}</td>
                <td>${disease.description}</td>
            `;
            tableBody.appendChild(tableRow);
        });

        // Update the page number displayed
        pageNumSpan.textContent = currentPage;

        // Disable buttons if on first or last page
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= diseaseData.length;
    }

    // Fetch all counties data when DOM is loaded
    fetchAllDiseases();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter counties data based on search term
        const filteredDiseases = diseaseData.filter(disease =>
            disease.name.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredDiseases.forEach(disease => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${disease.id}</td>
                <td>${disease.name}</td>
                <td>${disease.description}</td>
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
        if (currentPage < Math.ceil(diseaseData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });

    function createNewDisease() {

        // event.preventDefault();
        const diseaseName = document.getElementById("disease_name").value;
        const description = document.getElementById("description").value;
        
        if (!validateForm(diseaseName, description)) {
          return;
        }
        
        
        const diseaseData = {
          name: diseaseName,
          description: description,
        };
        
        const jsonData = JSON.stringify(diseaseData);
    
        const request = new Request("http://0.0.0.0:5000/api/v1/diseases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        });
        
        fetch(request)
          .then(response => {
            if (response.ok) {
              hideConfirmationDiv();
              return response.json();
            } else {
              console.error("Error saving hospital:", response.statusText);
              // Handle error message
            }
          })
          .then(jsonData => {
            showFeedbackDiv();
            console.log(jsonData);
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            confirmationTextDiv.textContent = jsonData.Message;
          })
          .catch(error => alert("Error sending request:", error));
      }
      
      function validateForm(diseaseName, description) {
        if (!diseaseName || !description) {
            alert("Please fill out all required fields!");
            return false;
        }
        return true;
      }
    
      document.getElementById("newDiseaseForm").addEventListener("submit", function(event) {
        createNewDisease(event);
      });
    
    const saveButton = document.getElementById('yes_button');
    
      saveButton.addEventListener("click", function() {
        createNewDisease();
      });



});



function clearForm() {
  const form = document.getElementById("newDiseaseForm");
  form.reset();
  }
    //
function hideNewDisease() {
  const newDoctorForm = document.getElementById("new_disease");
  newDoctorForm.style.display = "none";
}
  
function showAddNewDisease() {
  const showAddNewForm = document.getElementById('new_disease');
       
  if (showAddNewForm.style.display === 'none') {
    showAddNewForm.style.display = 'block';
  } else {
    showAddNewForm.style.display = 'none';
  }
} // window.onload = showAddNewDisease();
  
  // SHOWS CONFIRMATION DIV
function showConfirmationDiv() {
  const confirmationDiv = document.getElementById('confirmation_div');
  
     
  if (confirmationDiv.style.display === 'none') {
    confirmationDiv.style.display = 'block';
  } else {
    confirmationDiv.style.display = 'none';
  }
} // window.onload = showConfirmationDiv();
  
function hideConfirmationDiv() {
  const confirmationDiv = document.getElementById("confirmation_div");
  confirmationDiv.style.display = "none";
}
  
  // FUNCTION TO DISPLAY THE DIV
function showFeedbackDiv() {
  const feedbackDiv = document.getElementById("returned_info");
  feedbackDiv.style.display = "block";
}
  //HIDES THE RETURNED MESSAGE FROM THE SERVER DIV ON ADDING A NEW HOSPITAL
function hideFeedbackDiv() {
  const feedbackDiv = document.getElementById("returned_info");
  feedbackDiv.style.display = "none";
  clearForm();
}
  
  
  document.addEventListener("DOMContentLoaded", function() {
    showAddNewDisease();
    hideNewDisease();
    showConfirmationDiv();
  });