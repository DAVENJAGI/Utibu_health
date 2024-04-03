## Utibu_health:
# Your mobile medical companion for Chronic COndition management.

Utibu Health is a mobile application designed exclusively for patients of Utibu clinic who are managing chronic health conditions. THis user friendly app  is built entirely on React Native.The app empowers you to take control of your health journey by offering convenient features at your fingertips. 

```markdown
![Login Screen](/pics/login.jpeg)
```
## Key Features
 #  Remote refill orders
* Easily request for refills of your prescribed medications directly through the app. This removes the need for unnecessary clinic visits.

 # Secure payments.
* Utilize popular mobile payment platforms like M-Pesa and Airtel-money to seamlessly pay for your medication refills within the app. You can choose the payment method by mmoving to profiles page and clicking on payments tab.

 # Intuitive navigation.
* Effortlessly navigate through the app's interface using clear and recognizable icons.
    1. Home Icon. Returns you to the app's main landing page
    2. Prescription Icon: Grants access to your medication list and refill oprion
    3. Appointment Icon(calendar): Provides a view of your scheduled appointments 
    4. Profile Icon: Leads you to your personal profile settings

## Geting started.
* The app is currently not deployed. 
To use it, follow the steps below
(i) Download the Utibu_health repository using "git clone https://github.com/DAVENJAGI/Utibu_health.git
"
(ii) Navigate to the folder Utibu_health, ie type "cd Utibu_health" in your terminal.

(iii) Navigate to the ReactNative folder, ie type "cd ReactNative" in your terminal.

(iv) Type "npx expo start" in your terminal, while in the ReactNative folder. This will typically take a few seconds to launch.

(v) To check the functionality of the app's front-end, in IOS devices, Scan the QR-code using the camera and it will redirect you to the login page. For android phones, install Expo go from playstore and scan the QR-code from Expo go app. It will redirect you to the login page. If there's a routing dependency missing, click on the  and click the login.js page. This will load up the login page.

(vi) On the login page, enter the default email, ie "njagidave@gmail.com", and enter password "12345". Click the login button and it will route you to the home page.

(vii)Navigate from there.

## NB, The app is currently front end alone.There's not APIs linking to the back-end of utibu health. So we are just using the defaults. No data is being loaded to the app. This is the next feature seeking to be implemented. The app currently doesn't allow signing up for new users since to avoid the risk of illegally acquiring unprescribed drug.

# Libraries used.
* The libraries used for this project are
    * @react-navigation/native: RHis is the core react library providing the foundation for the navigation management
    * @react-navigation/drawer: Used for creating stacked navigation
    * react-navigation/native-stack: Used for navigation
    * Basic react-native library


# AUTHOR
David Njagi - [Github](https://github.com/DAVENJAGI)
