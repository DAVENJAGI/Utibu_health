// const { renderToReadableStream } = require("react-dom/server");

const urlParams = new URLSearchParams(window.location.search);
const appointmentId = urlParams.get('appointmentId');

document.addEventListener('DOMContentLoaded', () => {
const requestAppointment = `http://0.0.0.0:5000/api/v1/appointment/${appointmentId}`;
let userData;

fetch(requestAppointment)
        .then(response => response.json())
        .then(data => {
            console.log("Appointmet API data:", data);
            const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })

            const appointmentDate = document.getElementById('date_div_txt');
            const appointmentTime = document.getElementById('time_div_txt');
            const appointmentDescription = document.getElementById('description_div_txt');
            const optionSelect = document.getElementById('option_select_1'); 

            appointmentDate.textContent = formattedDate;
            appointmentTime.textContent = data.time; 
            appointmentDescription.textContent = data.description;
            optionSelect.textContent = data.appointment_status;

            const requestUser = `http://0.0.0.0:5000/api/v1/user/${data.user_id}`;
            return fetch(requestUser);
            
        })
        .then(response => response.json())
        .then(user => {

            userData = user;
            console.log("User API data:", userData);
            const firstName = document.getElementById('patient_first_name_txt');
            const lastName = document.getElementById('patient_last_name_txt');
            const dateOfBirth = document.getElementById('patient_date_of_birth');
            const patientEmail = document.getElementById('patient_email');  
          

          firstName.textContent = userData.first_name;
          lastName.textContent = userData.last_name;
          dateOfBirth.textContent = userData.date_of_birth;
          patientEmail.textContent = userData.email;

          const requestDoctor = `http://0.0.0.0:5000/api/v1/doctor/${userData.doctor_id}`;
          return fetch(requestDoctor);
        })
        .then(response => response.json())
        .then(doctorData => {
            const firstName = document.getElementById('doctor_first_name_txt');
            const lastName = document.getElementById('doctor_last_name_txt');
            const licenseNumber = document.getElementById('doctor_license_number');
            const doctorEmail = document.getElementById('doctor_email'); 

            firstName.textContent = doctorData.first_name;
            lastName.textContent = doctorData.last_name;
            licenseNumber.textContent = doctorData.license_no;
            doctorEmail.textContent = doctorData.email;

        })

        .catch(error => {
            console.error("Error fetching data:", error);
        });



        
    function updateNewAppointment() {
        const selectedOption = document.getElementById("appointment_select").value;
        let appointmentStatus;

        if (selectedOption === "Confirm") {
        appointmentStatus = "Confirmed";
        } else if (selectedOption === "Cancel") {
        appointmentStatus = "Cancelled";
        } else if (selectedOption === "No Show") {
        appointmentStatus = "No-show";
        } else {
        appointmentStatus = "Pending Confirmation";
        }

    
        const appointmentData = {
            appointment_status: appointmentStatus,
        };
        
        
        const jsonData = JSON.stringify(appointmentData);
        
    
        const request = new Request(`http://0.0.0.0:5000/api/v1/appointment/${appointmentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
        });
        
        fetch(request)
        .then(response => {
            if (response.ok) {
                hideConfirmationDiv()
                return response.json();
            } else {
                throw new Error(`Error updating appointment: ${response.statusText}`);
            }
        })
        .then(jsonData => {
            showFeedbackDiv();
            console.log(jsonData);
            const confirmationTextDiv = document.getElementById('saved_confirmation_text_text');
            confirmationTextDiv.textContent = jsonData.Message;
        })
        .catch(error => alert(error));
    }

    const saveButton = document.getElementById('yes_button');

    saveButton.addEventListener("click", function() {
        updateNewAppointment();
    });
});

function showConfirmationDiv() {
  const confirmationDiv = document.getElementById('confirmation_div');
  
     
  if (confirmationDiv.style.display === 'none') {
    confirmationDiv.style.display = 'block';
  } else {
    confirmationDiv.style.display = 'none';
  }
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
    window.location.reload();
  }
  

//HIDES THE CONFIRMATION DIV ON BEING CALLED
function hideConfirmationDiv() {
    const confirmationDiv = document.getElementById("confirmation_div");
    confirmationDiv.style.display = "none";
}

 //HIDES HOSPITAL FORM ONSUCCESS
function hideNewPatient() {
  const newPatientForm = document.getElementById("new_patient");
  newPatientForm.style.display = "none"; // Hides the form element
}
document.addEventListener("DOMContentLoaded", function() {
    showConfirmationDiv();
});