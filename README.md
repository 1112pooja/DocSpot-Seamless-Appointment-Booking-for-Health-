# Doctor Appointment Booking System (DocSpot) :

This project is a full-stack web application developed to simplify the process of booking doctor appointments. It allows users to easily find doctors, schedule appointments, and track their booking status. The system also provides separate dashboards for doctors and admins to manage appointments and users efficiently.

# Key Features:

Users can register and log in securely

Browse available doctors and view their details

Book appointments by selecting date and time

Upload documents while booking

View, manage, or cancel appointments

Receive notifications about appointment status

Doctors can register and manage their appointments after admin approval

Admin can approve doctors, manage users, and monitor the entire system

# Technologies Used:

Frontend:

React.js

Bootstrap / Material UI / Ant Design


Backend:

Node.js

Express.js

Database:

MongoDB (with Mongoose)

Other Tools & Libraries:

JWT (Authentication)

bcrypt.js (Password hashing)

Multer (File upload)

Axios

# Database Structure:

Users:

Stores user information such as name, email, password, phone number, and role (user/doctor).

Doctors:

Stores doctor details including specialization, experience, fees, availability timings, and approval status. Each doctor is linked to a user account.

Appointments:

Stores booking details such as user info, doctor info, appointment date, uploaded documents, and status.

# Installation & Setup:
Backend Setup:

cd backend npm install

Create a .env file and add:

PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_secret_key

Start backend server:

npm start

Frontend Setup:

cd frontend
npm install
npm start


# Application Flow:

1. User registers and logs in
<img width="1887" height="871" alt="image" src="https://github.com/user-attachments/assets/a5642887-7220-49c4-9f88-6d4348aa0579" />



3. User views available doctors
   <img width="1907" height="891" alt="Screenshot 2026-02-22 091642" src="https://github.com/user-attachments/assets/614c3bfc-32bc-46bf-afbd-6765946bf96e" />


5. User books an appointment
   <img width="1908" height="842" alt="image" src="https://github.com/user-attachments/assets/cad4d77e-1fef-45f6-b0e0-e19b49d5ecae" />



7. Admin approves doctor registrations
   <img width="1855" height="653" alt="image" src="https://github.com/user-attachments/assets/2dd38fc4-fb96-47a9-9c4a-f66f391f12d0" />



9. Doctor manages appointment requests
    <img width="1908" height="842" alt="image" src="https://github.com/user-attachments/assets/8bcd4baa-9f0a-4cd4-acd0-e5849b22ffed" />



11. User receives updates and can track booking status
<img width="1917" height="542" alt="image" src="https://github.com/user-attachments/assets/07526a1e-704b-4003-aae9-fdd7faa3d844" />



# Future Enhancements:
Online payment integration

Video consultation feature

Mobile application support

Advanced search & filtering

# Conclusion:
This project demonstrates the implementation of a real-world healthcare booking system using the MERN stack. It focuses on user convenience, efficient data handling, and role-based access control for better system management.
