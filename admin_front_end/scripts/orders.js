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

            const patientName = '';
            const medicationName = '';
            const doctorName = '';
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


    function fetchOrderDetails(orderId) {
        const orderDetailsUrl = `http://0.0.0.0:5000/api/v1/order/${orderId}`;
        return fetch(orderDetailsUrl, { headers: getAuthHeaders() })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
    
    function fetchRelatedData(patientId, doctorId, medicationId) {
        return Promise.all([
            fetch(`http://0.0.0.0:5000/api/v1/user/${patientId}`, { headers: getAuthHeaders() }).then(response => response.json()),
            fetch(`http://0.0.0.0:5000/api/v1/doctor/${doctorId}`, { headers: getAuthHeaders() }).then(response => response.json()),
            fetch(`http://0.0.0.0:5000/api/v1/medication/${medicationId}`, { headers: getAuthHeaders() }).then(response => response.json())
        ]);
    }
    
    function updateOrderStatusDiv(orderDetails, patientData, doctorData, medicationData) {
        const orderStatusDiv = document.getElementById('order_status_div');
        
        document.getElementById('order_id_id').textContent = `Order Id: ${orderDetails.id}`;
        
        const medicationNameElem = document.getElementById('medication_name');
        medicationNameElem.textContent = medicationData.name || 'N/A';
        
        const orderQuantityElem = document.getElementById('order_quantity');
        orderQuantityElem.textContent = orderDetails.quantity;
        
        const orderPriceElem = document.getElementById('order_price');
        orderPriceElem.textContent = `$${orderDetails.billing_cost}`;
        
        const patientNameElem = document.getElementById('patient_name');
        patientNameElem.textContent = `${patientData.first_name} ${patientData.last_name}`;
        
        const doctorNameElem = document.getElementById('doctor_name');
        doctorNameElem.textContent = `${doctorData.first_name} ${doctorData.last_name}`;
        
        const placedAtElem = document.getElementById('placed_at');
        const formattedPlacedAt = new Date(orderDetails.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        placedAtElem.textContent = formattedPlacedAt;
        
        const updatedAtElem = document.getElementById('updated_at');
        const formattedUpdatedAt = new Date(orderDetails.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        updatedAtElem.textContent = formattedUpdatedAt;
        
        const orderStatus = document.getElementById('option_select_1');
        const orderSelect = document.getElementById('order_select');
        orderStatus.textContent = orderDetails.order_status;

        const status = orderDetails.order_status.trim().toLowerCase(); 
        if (status === 'pending approval') {
            orderSelect.style.backgroundColor = '#00B300'; 
        } else if (status === 'approved') {
            orderSelect.style.backgroundColor = '#B3E5FC';
        } else {
            orderSelect.style.backgroundColor = '#FFBABA';
        }
        
    }
    
    function showOrderStatusDiv() {
        const orderStatusDiv = document.getElementById('order_status_div');
        const computedStyle = window.getComputedStyle(orderStatusDiv);
        if (computedStyle.display === "none") {
            orderStatusDiv.style.display = 'block';
            if(orderStatusDiv.style.display = 'block'){
                orderStatusDiv.style.zIndex = "200";
                showOverlay();
            }
        }
    }

    function hideOrderStatusDiv() {
        const orderStatusDiv = document.getElementById('order_status_div');
        const orderSelect = document.getElementById('order_select');
        const computedStyle = window.getComputedStyle(orderStatusDiv);
        if (computedStyle.display === "block") {
            orderStatusDiv.style.display = 'none';
            orderSelect.selectedIndex = 0;
        }
    }
    function hideOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'block') {
          overlayDiv.style.display = 'none';
        }
      }

    function showOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'none') {
          overlayDiv.style.display = 'block';
          overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
      }

    const myButton = document.getElementById('order_exit_div');
            myButton.addEventListener('click', () => {
                hideOrderStatusDiv();
                hideOverlay();
            });
    
    tableBody.addEventListener('click', (event) => {
        if (event.target.tagName !== 'TD') return;
        const clickedRow = event.target.closest('tr');
        if (!clickedRow) return;
        const orderId = clickedRow.cells[1].textContent;
    
        fetchOrderDetails(orderId)
            .then(orderDetails => {
                const patientId = orderDetails.user_id;
                const doctorId = orderDetails.doctor_id;
                const medicationId = orderDetails.medication_id;
    
                return fetchRelatedData(patientId, doctorId, medicationId).then(([patientData, doctorData, medicationData]) => {
                    updateOrderStatusDiv(orderDetails, patientData, doctorData, medicationData);
                    showOrderStatusDiv();
                });
            })
            .catch(error => {
                console.error("Error fetching order details or related data:", error);
            });
    });
    
    
});