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

# 1. User registers and logs in
<img width="1887" height="871" alt="Screenshot 2026-02-22 100754" src="https://github.com/user-attachments/assets/cddb2c07-5bce-4935-8aab-584593a0ccfc" />



# 3. User views available doctors
   <img width="1872" height="877" alt="Screenshot 2026-02-22 091445" src="https://github.com/user-attachments/assets/dc429a55-284c-4e46-91b5-a2923b19b937" />


# 5. User books an appointment
<img width="1018" height="716" alt="Screenshot 2026-02-22 100300" src="https://github.com/user-attachments/assets/633caff5-d48f-46f3-8446-7d6b8f664a5e" />




# 7. Admin approves doctor registrations
<img width="1247" height="802" alt="Screenshot 2026-02-20 121114" src="https://github.com/user-attachments/assets/a012a87e-b929-4c13-9621-fa8d64d66e36" />





# 9. Doctor manages appointment requests
    <img width="1908" height="842" alt="Screenshot 2026-02-22 100410" src="https://github.com/user-attachments/assets/40d258d9-0517-4f62-89a1-ac0a1c58249a" />




# 11. User receives updates and can track booking status
<img width="1917" height="542" alt="Screenshot 2026-02-22 100635" src="https://github.com/user-attachments/assets/1e105684-7417-49e9-854b-b689b6e4b788" />


# Future Enhancements:
Online payment integration

Video consultation feature

Mobile application support

Advanced search & filtering

# Conclusion:
This project demonstrates the implementation of a real-world healthcare booking system using the MERN stack. It focuses on user convenience, efficient data handling, and role-based access control for better system management.
