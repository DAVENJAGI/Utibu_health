```
This branch, DAVE, contains the basic information about the app. The code is in the master branch in the app directory
```

## Utibu_health:
# Your mobile medical companion for Chronic Condition management.

Utibu Health is a mobile application designed exclusively for patients of Utibu clinic who are managing chronic health conditions. This user friendly app  is built entirely on React Native.The app empowers you to take control of your health journey by offering convenient features at your fingertips. 

# App Screen Layout.

## Login Screen
* Since medical records is private information, the Utibu health app integrates a login page to grant the user privacy of their medical information. Every user is required to use an email and password to log in to the app.
![Login Screen](/pics/login.jpeg)

## Home Screen
* Easy to use home layout with popular choice of icons.
* The home page also incorporates a greeting based on the time of day, eg Good morning for mornig, good afternoon for afternoon, and good evening for evening hours, with the patient's username. This ensures a welcoming and personalized experience for users.
![Home Screen](/pics/home.jpeg)

## Prescriptions Screen
* A prescription page to allow patients see drugs available to them.
* This will ensure that only drugs prescribes to the patient can be viewed by the patient, with their availability. This is to prevent abuse of drugs.
![Prescriptions Screen](/pics/prescriptions.jpeg)

## Appointment Screen
* An appointment page to allow patients see next appointmens.
* The icon chosen for this is a calendar. The no appointments page is integrated with emojis, to display emotions. This feature will also ensure scalability and addition of more features such as the set appointment feature, and integration of APIs like Calendly API to ensure scheduling of the events abd reminder of appointment day to ensure that all set appointments are attended. It will also seek to enable setting of appointment with the medical professional available to the patient in implementation of features later on.
![Appointment Screen](/pics/appointments.jpeg)

## Profile Screen
* A profile page that displays patient's user info.
* This displays various user info, such as the user name, set profile photo, a number to contact the hospital, user id to ensure easy trackability of information in the database, previous orders page, to ensure the user is able to see the previous medicine orders. It also contains the About us button where on pressing it redirects you to the About us page of utibu health, and finally the sign out button which on clicking it routes you back to the login page.

![Profile Screen](/pics/profile.jpeg)

## Payment Screen
* A payment page to allow patients to complete their transactional payment. Will seek to implement availabe APIs for the payment method the clinic offers.
![Payment Screen](/pics/payment.jpeg)

## Previous order Screen
* A previous orders screen to show previous completed orders, with the medication name, the disease the medication cures, and the date the transaction was completed.
![Appointment Screen](/pics/previous.jpeg)


## Key Features
The app ensures the following:
# Remote orders.
* Easily request for refills of your prescribed medications directly through the app. This removes the need for unnecessary clinic visits.

 # Secure payments.
* Will seek to utilize popular mobile payment platforms like M-Pesa and Airtel-money to seamlessly pay for your medication refills within the app. You can choose the payment method by mmoving to profiles page and clicking on payments tab. This feature will seek to solve the challenge of the user having to move to the clinic to complete the payment of their meds. 

 # Intuitive navigation.
* Effortlessly navigate through the app's interface using clear and recognizable icons.
    1. Home Icon. Returns you to the app's main landing page. Seeked to use an easily recognizable icon to ensure the app is user friendly and easy to use.
    2. Prescription Icon: Routes you the medication available to you only.
    3. Appointment Icon(calendar): Provides a view of your scheduled appointments page.
    4. Profile Icon: The icon chosen for this is the menu icon. It provides you a view of your profile page

## Geting started.
* The app is currently not deployed. To use it, follow the steps below

(i) Download the Utibu_health repository to your local machine using ```git clone https://github.com/DAVENJAGI/Utibu_health.git```

(ii) Navigate to the folder Utibu_health, ie type ```cd Utibu_health``` in your terminal.

(iii) Navigate to the ReactNative folder, ie type ```cd ReactNative``` in your terminal.

(iv) Type ```npx expo start``` in your terminal, while in the ReactNative folder. This will typically take a few seconds to launch.

(v) To check the functionality of the app's front-end, in IOS devices, Scan the QR-code using the camera and it will redirect you to the login page. For android phones, install Expo go from playstore and scan the QR-code from Expo go app. It will redirect you to the login page. If there's a routing dependency missing, click on the  and click the login.js page. This will load up the login page.

(vi) On the login page, enter the default email, ie ```njagidave@gmail.com```, and enter password ```12345```. Click the login button and it will route you to the home page.

(vii)Navigate from there.

## NB, The app is currently front end alone. The back-end API endpoints are not currently available.

# Libraries used.
* The libraries used for this project are
    * @react-navigation/native: RHis is the core react library providing the foundation for the navigation management
    * @react-navigation/drawer: Used for creating stacked navigation
    * react-navigation/native-stack: Used for navigation
    * Basic react-native library


## How does the orders placed get updated in the legacy database???
The approach to connect to the server with a private IP address is using a Demilitarized Zone, DMZ.
* We can create a demilitarized zone within the network, a subnetwork that sits between the internal network where the server resides and the public internet. The server with the legacy database would be placed in the DMZ, firewall perimeter configured to restrict certain ports from being accessed by the traffic from the front-end server to reach the server to update the databse. This is to ensure security of the patient's data records.
* The front end accesses to send order to the server in the demilitarized zone. The server interacts with the database to update the orders table.

# AUTHOR
David Njagi - [Github](https://github.com/DAVENJAGI)
