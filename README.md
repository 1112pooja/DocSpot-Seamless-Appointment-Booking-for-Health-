# DocSpot-Seamless-Appointment-Booking-for-Health-
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
The application uses three main collections:

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

cd frontend npm install npm start

# Application Flow:
User registers and logs in
<img width="1887" height="871" alt="Screenshot 2026-02-22 100754" src="https://github.com/user-attachments/assets/c889dc63-da24-4fac-8af4-a0914db708af" />


User views available doctors
<img width="1872" height="877" alt="Screenshot 2026-02-22 091445" src="https://github.com/user-attachments/assets/aeb35c3f-fe79-4a9b-99e4-6f0fc0e2f025" />


User books an appointment 
<img width="1018" height="716" alt="Screenshot 2026-02-22 100300" src="https://github.com/user-attachments/assets/d1500e60-ecbd-4f4b-8071-0592634e276e" />


Admin approves doctor registrations 
<img width="1540" height="766" alt="Screenshot 2026-02-22 091735" src="https://github.com/user-attachments/assets/567f023a-4820-4a56-964e-236ac8705b5e" />


Doctor manages appointment requests 
<img width="1855" height="653" alt="Screenshot 2026-02-22 100522" src="https://github.com/user-attachments/assets/d314dbf6-a75c-478f-ad6f-af4f347daefe" />


User receives updates and can track booking status
<img width="1917" height="542" alt="Screenshot 2026-02-22 100635" src="https://github.com/user-attachments/assets/4efa9bed-aabd-4853-a48d-2d0a2c1592c3" />


# Future Enhancements:
Online payment integration

Video consultation feature

Mobile application support

Advanced search & filtering

# Conclusion:
This project demonstrates the implementation of a real-world healthcare booking system using the MERN stack. It focuses on user convenience, efficient data handling, and role-based access control for better system management.
