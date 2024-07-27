document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/users'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let userData = []; // Array to store all counties data
    let columnUserId;

    // DOM elements
    const tableBody = document.getElementById('myPatientTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');

    // Function to fetch all counties data
    function fetchAllUsers() {
        fetch(requestUrl)
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


    

    const searchInput = document.getElementById('search_input_home');
    const searchButton = document.getElementById('search_button_home');

    

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
                <td><input type="checkbox" id="checkbox-${user.id}"></td>
                <td>${user.id}</td>
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

    // Fetch all counties data when DOM is loaded
    fetchAllUsers();


    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        const filteredUsers = userData.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.last_name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.id.toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredUsers.forEach(user => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td><input type="checkbox" id="checkbox-${user.id}"></td>
                <td>${user.id}</td>
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
        if (currentPage < Math.ceil(userData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;

        const clickedRow = event.target.parentNode;
        const userId = clickedRow.cells[1].textContent;

        window.location.href = `user_profile.html?userId=${userId}`;
    });

    //EVENT LISTENER TO CHANGE THE COLOR OF THE TEXT ON CLICKING THE CHECKBOX
    tableBody.addEventListener('click', (event) => {
        if (event.target.type === 'checkbox') {
            const checkbox = event.target;
            checkbox.parentElement.style.color = 'red';
            const checkboxId = checkbox.id;
            console.log('Clicked checkbox ID:', checkboxId);
            
            const userId = checkbox.id.split('checkbox-')[1]; 
            const saveButton = document.getElementById('yes_button');
            saveButton.addEventListener("click", function() {
                deleteUser(userId);
            });   
            
            const clickedRow = checkbox.closest('tr');
            clickedRow.style.color = checkbox.checked ? '#1a6860' : '';
            clickedRow.style.backgroundColor = checkbox.checked ? '#E2F3E6' : '';
        }
    });

    //FUNCTION THAT DELETES A USER
    function deleteUser(userId) {
        const deleteRequest = `http://0.0.0.0:5000/api/v1/user/${userId}`;
    
        fetch(deleteRequest, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                hideConfirmationDiv();
                return response.json();
            } else {
            console.error("Error deleting user:", response.statusText);
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

  

});

// SHOWS CONFIRMATION DIV
function showConfirmationDiv() {
  const confirmationDiv = document.getElementById('confirmation_div');
     
  if (confirmationDiv.style.display === 'none') {
    confirmationDiv.style.display = 'block';
  }
}

function hideConfirmationDiv() {
    const confirmationDiv = document.getElementById("confirmation_div");
    confirmationDiv.style.display = "none";
}
// FUNCTION TO DISPLAY THE DIV
function showFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "block";
}
function hideFeedbackDiv() {
    const feedbackDiv = document.getElementById("returned_info");
    feedbackDiv.style.display = "none";

}
document.addEventListener('DOMContentLoaded', () => {
    showConfirmationDiv();
    hideConfirmationDiv();
    showFeedbackDiv();
    hideFeedbackDiv();
})