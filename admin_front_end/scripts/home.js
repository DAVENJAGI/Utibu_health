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
    
    const customToken = localStorage.getItem('X-Custom-Token');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    fetch(requestUrl, { headers: getAuthHeaders()})
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
            return fetch(totalPayment, { headers: getAuthHeaders()});
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
      
        const searchOrder = document.getElementById('search_input_home');
        const searchButton = document.getElementById('search_button_home');
      
      
        function displayCurrentPage() {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const currentPageOrders = orderData.slice(startIndex, endIndex);
      
            tableBody.innerHTML = '';
      
            currentPageOrders.forEach(order => {
                if (order.order_status === 'Pending Approval') {
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

                    if (order.order_status === 'Pending Approval') {
                        statusColor = 'red';
                    } else if (order.order_status === 'approved') {
                        statusColor = 'green';
                    }
    
                    tableRow.innerHTML = `
                        <td><input type="checkbox"></td>
                        <td>${patientName}</td>
                        <td>${doctorName}</td>
                        <td>${medicationName}</td>
                        <td>${order.quantity}</td>
                        <td>$${order.billing_cost}</td>  
                        <td style="color: ${statusColor};">${order.order_status}</td>
                        <td>${formattedDate}</td>
                    `;
                    tableBody.appendChild(tableRow);
                }).catch(error => console.error("Error fetching data:", error));
            }
            });
            tableBody.addEventListener('click', (event) => {
                if (event.target.type === 'checkbox') {
                    const checkbox = event.target;
                    checkbox.parentElement.style.color = 'red';
                    const checkboxId = checkbox.id;
                    console.log('Clicked checkbox ID:', checkboxId);
                    
                    const clickedRow = checkbox.closest('tr');
                    clickedRow.style.color = checkbox.checked ? '#1a6860' : '';
                    clickedRow.style.backgroundColor = checkbox.checked ? '#E2F3E6' : '';
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
                order.id.toLowerCase().includes(searchTerm) ||
                [order.user.first_name, order.user.last_name].join(' ').toLowerCase().includes(searchTerm) || // Combine first and last name for patient search
                order.medication.name.toLowerCase().includes(searchTerm) ||
                [order.doctor.first_name, order.doctor.last_name].join(' ').toLowerCase().includes(searchTerm)
            );
      
            tableBody.innerHTML = '';
            filteredOrders.forEach(order => {
                    const tableRow = document.createElement("tr");
        
                    let statusColor = '';
                    if (order.order_status === 'pending approval') {
                    statusColor = 'red';
                    } else if (order.order_status === 'approved') {
                    statusColor = 'green';
                    }
        
        
                    fetch(`http://0.0.0.0:5000/api/v1/user/${order.user_id}`, { headers: getAuthHeaders()})
                    .then(response => response.json())
                    .then(patientData => {
                    const patientName = `${patientData.first_name} ${patientData.last_name}`;
                
        
                    fetch(`http://0.0.0.0:5000/api/v1/medication/${order.medication_id}`, { headers: getAuthHeaders()})
                    .then(response => response.json())
                    .then(medicationData => {
                        const medicationName = medicationData.name;

                        fetch(`http://0.0.0.0:5000/api/v1/doctor/${order.doctor_id}`, { headers: getAuthHeaders()})
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
                        .catch(error => console.error("Error fetching doctor:", error));
                    
                    })
                    .catch(error => console.error("Error fetching medication:", error));
                    })
                    .catch(error => console.error("Error fetching patient:", error));
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


        tableBody.addEventListener('click', (event) => {
            if (event.target.type === 'checkbox') {
                const checkbox = event.target;
                checkbox.parentElement.style.color = 'red';
                const checkboxId = checkbox.id;
                console.log('Clicked checkbox ID:', checkboxId);
                /*
                const userId = checkbox.id.split('checkbox-')[1]; 
                const saveButton = document.getElementById('yes_button');
                saveButton.addEventListener("click", function() {
                    deleteUser(userId);
                });  */
                
                const clickedRow = checkbox.closest('tr');
                clickedRow.style.color = checkbox.checked ? '#1a6860' : '';
                clickedRow.style.backgroundColor = checkbox.checked ? '#E2F3E6' : '';
            }
        });
        
});



document.addEventListener('DOMContentLoaded', () => {
const userData = [
    { date: 'January', users: 13, doctors: 2, diseases: 4, orders: 0},
    { date: 'February', users: 120, doctors: 13, diseases: 8, orders: 0},
    { date: 'March', users: 160, doctors: 25, diseases: 13, orders: 1},
    { date: 'April', users: 10, doctors: 21, diseases: 9, orders: 5},
    { date: 'May', users: 80, doctors: 35, diseases: 14, orders: 12},
    { date: 'June', users: 90, doctors: 28, diseases: 11, orders: 20},
    { date: 'July', users: 200, doctors: 51, diseases: 15, orders: 25},
    { date: 'August', users: 170, doctors: 43, diseases: 6, orders: 45},
    { date: 'September', users: 53, doctors: 39, diseases: 10, orders: 18},
    { date: 'October', users: 66, doctors: 49, diseases: 15, orders: 19},
    { date: 'November', users: 90, doctors: 24, diseases: 14, orders: 11},
    { date: 'December', users: 96, doctors: 28, diseases: 14, orders: 23},
]

const ctx = document.getElementById('userChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: userData.map(data => data.date),
        datasets: [{
            label: 'Website Users',
            data: userData.map(data => data.users),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
        },
        {
            label: 'Doctors',
            data: userData.map(data => data.doctors),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1,
        },
        {
            label: 'Diseases',
            data: userData.map(data => data.diseases),
            borderColor: 'rgba(26, 104, 96, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1,
        },
        {
            label: 'Orders Placed',
            data: userData.map(data => data.orders),
            borderColor: 'rgba(200, 150, 102, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1,
        }
    ]
    },
    options: {
        x: {
            display: true,
            label: 'Date',
            ticks: { 
                
            }
        },
        y: {
            display: true,
            label: {
                display: true,
                text: 'number Users'
            },
            ticks: {
            }
          }
    }
});
});

document.addEventListener('DOMContentLoaded', () => {
    const userData = [
        { gender: 'Male', count: 100 },
        { gender: 'Female', count: 80 }
    ];

    const ctx = document.getElementById('gender_pie_chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: userData.map(data => data.gender),
            datasets: [{
                data: userData.map(data => data.count),
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
                borderColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const ageGroups = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71+"];
    const ageCounts = [20, 35, 40, 50, 60, 70, 80, 90];

    const ctx = document.getElementById('age_distribution_chart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ageGroups,
        datasets: [{
            label: 'Age Distribution',
            data: ageCounts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(26, 104, 96, 0.8)',
                'rgba(0, 0, 0, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});
});

document.addEventListener('DOMContentLoaded', () => {
    const appointmentData = [
        {
          month: "January",
          setAppointments: 10,
          confirmed: 2,
          attended: 2,
          cancelled: 6,
          rescheduled: 2,
          noShow: 0
        },
        {
            month: "February",
            setAppointments: 12,
            confirmed: 8,
            attended: 6,
            cancelled: 2,
            rescheduled: 0,
            noShow: 4
        },
        {
            month: "March",
            setAppointments: 5,
            confirmed: 5,
            attended: 4,
            cancelled: 0,
            rescheduled: 0,
            noShow: 1
        },
        {
            month: "April",
            setAppointments: 15,
            confirmed: 12,
            attended: 11,
            cancelled: 1,
            rescheduled: 2,
            noShow: 1
        },
        {
            month: "May",
            setAppointments: 7,
            confirmed: 7,
            attended: 6,
            cancelled: 0,
            rescheduled: 1,
            noShow: 0
        },
        {
            month: "June",
            setAppointments: 19,
            confirmed: 16,
            attended: 10,
            cancelled: 3,
            rescheduled: 0,
            noShow: 3
        },
        {
            month: "July",
            setAppointments: 4,
            confirmed: 4,
            attended: 4,
            cancelled: 0,
            rescheduled: 0,
            noShow: 0
        },
        {
            month: "August",
            setAppointments: 10,
            confirmed: 9,
            attended: 5,
            cancelled: 2,
            rescheduled: 1,
            noShow: 1
        },
        {
            month: "September",
            setAppointments: 12,
            confirmed: 11,
            attended: 9,
            cancelled: 0,
            rescheduled: 0,
            noShow: 1
        },
        {
            month: "October",
            setAppointments: 20,
            confirmed: 18,
            attended: 6,
            cancelled: 10,
            rescheduled: 0,
            noShow: 2
        },
        {
            month: "November",
            setAppointments: 8,
            confirmed: 8,
            attended: 4,
            cancelled: 2,
            rescheduled: 1,
            noShow: 1
        },
        {
            month: "December",
            setAppointments: 15,
            confirmed: 15,
            attended: 10,
            cancelled: 3,
            rescheduled: 1,
            noShow: 1
        },
        
      ];
      const ctx = document.getElementById('bar_chart').getContext('2d');

      const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: appointmentData.map(data => data.month),
              datasets: [
                  {
                      label: 'Set Appointments',
                      data: appointmentData.map(data => data.setAppointments),
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                  },
                  {
                    label: 'Confirmed',
                    data: appointmentData.map(data => data.confirmed),
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Attended',
                    data: appointmentData.map(data => data.attended),
                    backgroundColor: 'rgba(26, 104, 96, 0.8)',
                    borderColor: 'rgba(26, 104, 96, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Cancelled',
                    data: appointmentData.map(data => data.cancelled),
                    backgroundColor: 'rgba(200, 150, 102, 0.8)',
                    borderColor: 'rgba(200, 150, 102, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Rescheduled',
                    data: appointmentData.map(data => data.rescheduled),
                    backgroundColor: 'rgba(105, 62, 254, 0.8)',
                    borderColor: 'rgba(105, 62, 254, 1)',
                    borderWidth: 1
                },
                {
                    label: 'No-Show',
                    data: appointmentData.map(data => data.noShow),
                    backgroundColor: 'rgba(153, 102, 255, 0.8)',
                    borderColor: 'rgba(153, 102, 255, 0.8)',
                    borderWidth: 1
                },
                  
              ]
          },
          options: {
              responsive: true,
              // ... other chart options as needed
          }
      });
});