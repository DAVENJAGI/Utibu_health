document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/stats';
    const requestOrders = 'http://0.0.0.0:5000/api/v1/orders';
    const pageSize = 10;
    let currentPage = 1;
    const tableBody = document.getElementById('myOrderTable').getElementsByTagName('tbody')[0];
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageNumSpan = document.getElementById('page-num');
    orderData = [];

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API data:", data);
            const regionsCount = document.getElementById('regions_count');
            const hospitalCount = document.getElementById('hospitals_count');
            const doctorCount = document.getElementById('doctors_count');
            const patientCount = document.getElementById('patients_count');
            const diseaseCount = document.getElementById('diseases_count');
            const medicationCount = document.getElementById('medications_count');
            const appointmentCount = document.getElementById('appointments_count');
            const orderCount = document.getElementById('orders_count');
            

            regionsCount.textContent = data.Counties;
            hospitalCount.textContent = data.Hospitals;
            doctorCount.textContent = data.Doctors;
            patientCount.textContent = data.Users;
            diseaseCount.textContent = data.Diseases;
            medicationCount.textContent = data.Medications;
            appointmentCount.textContent = data.Appointments;
            orderCount.textContent = data.Orders;
           

            const totalPayment = 'http://0.0.0.0:5000/api/v1/payments';
            return fetch(totalPayment);
        })
        .then(response => response.json())
        .then(paymentData => {
          console.log("Payment API data:", paymentData);
          const paymentCount = document.getElementById('payments_count');

          paymentCount.textContent = '$' + paymentData.total_money_transacted;

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });


        function fetchOrders() {
            fetch(requestOrders)
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
      
        const searchOrder = document.getElementById('search_input_home');
        const searchButton = document.getElementById('search_button_home');
      
      
        function displayCurrentPage() {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const currentPageOrders = orderData.slice(startIndex, endIndex);
      
            tableBody.innerHTML = '';
      
            currentPageOrders.forEach(order => {
                if (order.order_status === 'pending approval'){ 
                const tableRow = document.createElement("tr");
      
                let statusColor = '';
                if (order.order_status === 'pending approval') {
                  statusColor = 'red';
                } else if (order.order_status === 'approved') {
                  statusColor = 'green';
                }
      
                fetch(`http://0.0.0.0:5000/api/v1/user/${order.user_id}`)
                .then(response => response.json())
                .then(patientData => {
                  const patientName = `${patientData.first_name} ${patientData.last_name}`;
            
      
                  fetch(`http://0.0.0.0:5000/api/v1/medication/${order.medication_id}`)
                  .then(response => response.json())
                  .then(medicationData => {
                    const medicationName = medicationData.name;

                    fetch(`http://0.0.0.0:5000/api/v1/doctor/${order.doctor_id}`)
                    .then(response => response.json())
                    .then(doctorData => {
                    const doctorName = `${doctorData.first_name} ${doctorData.last_name}`;

                    const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      });


      
      
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
                    })
                    .catch(error => console.error("Error fetching patient:", error));
                  })
                  .catch(error => console.error("Error fetching medication:", error));
                })
                .catch(error => console.error("Error fetching patient:", error));
            }
            });
      
            pageNumSpan.textContent = currentPage;
      
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = endIndex >= orderData.length;
        }
        fetchOrders();
      
      
        searchButton.addEventListener('click', () => {
            const searchTerm = searchOrder.value.trim().toLowerCase();
      
            // Filter counties data based on search term
            const filteredOrders = orderData.filter(order =>
                order.order_status.toLowerCase().includes(searchTerm) ||
                order.id.toLowerCase().includes(searchTerm)
            );
      
            tableBody.innerHTML = '';
            filteredOrders.forEach(order => {
                if (order.order_status === 'pending approval'){
                    const tableRow = document.createElement("tr");
        
                    let statusColor = '';
                    if (order.order_status === 'pending approval') {
                    statusColor = 'red';
                    } else if (order.order_status === 'approved') {
                    statusColor = 'green';
                    }
        
        
                    fetch(`http://0.0.0.0:5000/api/v1/user/${order.user_id}`)
                    .then(response => response.json())
                    .then(patientData => {
                    const patientName = `${patientData.first_name} ${patientData.last_name}`;
                
        
                    fetch(`http://0.0.0.0:5000/api/v1/medication/${order.medication_id}`)
                    .then(response => response.json())
                    .then(medicationData => {
                        const medicationName = medicationData.name;
        
        
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
                    
                    })
                    .catch(error => console.error("Error fetching medication:", error));
                    })
                    .catch(error => console.error("Error fetching patient:", error));
                }
            });
      
            searchOrder.value = '';
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