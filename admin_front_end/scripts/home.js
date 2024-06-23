document.addEventListener('DOMContentLoaded', () => {
    const requestUrl = 'http://0.0.0.0:5000/api/v1/stats';

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
            const paymentCount = document.getElementById('payments_count');

            regionsCount.textContent = data.Counties;
            hospitalCount.textContent = data.Hospitals;
            doctorCount.textContent = data.Doctors;
            patientCount.textContent = data.Users;
            diseaseCount.textContent = data.Diseases;
            medicationCount.textContent = data.Medications;
            appointmentCount.textContent = data.Appointmets;

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
        
});