document.addEventListener('DOMContentLoaded', () => {
    const requestOrders = 'http://0.0.0.0:5000/api/v1/orders'; // Replace with your actual API endpoint
    const pageSize = 10; // Number of items to display per page
    let currentPage = 1;
    let orderData = []; // Array to store all orders data

    // DOM elements
    const tableBody = document.getElementById('myOrderTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');
    const searchOrderInput = document.getElementById('search_input_home');
    const searchOrderButton = document.getElementById('search_button_home');

    const customToken = localStorage.getItem('X-Custom-Token');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    function fetchOrders() {
        fetch(requestOrders, { headers: getAuthHeaders()})
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

    function displayCurrentPage() {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageOrders = orderData.slice(startIndex, endIndex);

        tableBody.innerHTML = '';

        currentPageOrders.forEach(order => {
            // Fetch additional data for each order
            Promise.all([
                fetch(`http://0.0.0.0:5000/api/v1/user/${order.user_id}`, { headers: getAuthHeaders()}).then(response => response.json()),
                fetch(`http://0.0.0.0:5000/api/v1/medication/${order.medication_id}`, { headers: getAuthHeaders()}).then(response => response.json()),
                fetch(`http://0.0.0.0:5000/api/v1/doctor/${order.doctor_id}`, { headers: getAuthHeaders()}).then(response => response.json())
            ]).then(([patientData, medicationData, doctorData]) => {
                const patientName = `${patientData.first_name} ${patientData.last_name}`;
                const medicationName = medicationData.name;
                const doctorName = `${doctorData.first_name} ${doctorData.last_name}`;
                const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
                
                const tableRow = document.createElement("tr");
                let statusColor = '';
                if (order.order_status === 'pending approval') {
                    statusColor = 'red';
                } else if (order.order_status === 'approved') {
                    statusColor = 'green';
                }

                tableRow.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${order.id}</td>
                    <td>${patientName}</td>
                    <td>${doctorName}</td>
                    <td>${medicationName}</td>
                    <td>${order.quantity}</td>
                    <td>${formattedDate}</td>
                    <td style="color: ${statusColor};">${order.order_status}</td>
                    <td>$${order.billing_cost}</td>  
                    <td>${order.delivery_mode}</td>                
                `;
                tableBody.appendChild(tableRow);
            }).catch(error => console.error("Error fetching data:", error));
        });

        pageNumSpan.textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = endIndex >= orderData.length;
    }

    fetchOrders();

    searchOrderButton.addEventListener('click', () => {
        const searchTerm = searchOrderInput.value.trim().toLowerCase();

        const filteredOrders = orderData.filter(order =>
            order.id.toString().toLowerCase().includes(searchTerm)
        );

        // Update table with filtered data
        tableBody.innerHTML = '';
        filteredOrders.forEach(order => {
            const tableRow = document.createElement("tr");
            let statusColor = '';
            if (order.order_status === 'pending approval') {
                statusColor = 'red';
            } else if (order.order_status === 'approved') {
                statusColor = 'green';
            }

            const patientName = ''; // These variables need to be defined inside this scope or fetched again
            const medicationName = ''; // These variables need to be defined inside this scope or fetched again
            const doctorName = ''; // These variables need to be defined inside this scope or fetched again
            const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            console.log(patientName);
            tableRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${order.id}</td>
                <td>${patientName}</td>
                <td>${doctorName}</td>
                <td>${medicationName}</td>
                <td>${order.quantity}</td>
                <td>${formattedDate}</td>
                <td style="color: ${statusColor};">${order.order_status}</td>
                <td>$${order.billing_cost}</td>  
                <td>${order.delivery_mode}</td>                
            `;
            tableBody.appendChild(tableRow);
        });

        searchOrderInput.value = '';
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(orderData.length / pageSize)) {
            currentPage++;
            displayCurrentPage();
        }
    });
});