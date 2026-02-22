Doctor Appointment Booking System (DocSpot) :

This project is a full-stack web application developed to simplify the process of booking doctor appointments. It allows users to easily find doctors, schedule appointments, and track their booking status. The system also provides separate dashboards for doctors and admins to manage appointments and users efficiently.

Key Features:

Users can register and log in securely

Browse available doctors and view their details

Book appointments by selecting date and time

Upload documents while booking

View, manage, or cancel appointments

Receive notifications about appointment status

Doctors can register and manage their appointments after admin approval

Admin can approve doctors, manage users, and monitor the entire system


Technologies Used:

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


Database Structure:

The application uses three main collections:

Users:

Stores user information such as name, email, password, phone number, and role (user/doctor).

Doctors:

Stores doctor details including specialization, experience, fees, availability timings, and approval status. Each doctor is linked to a user account.

Appointments:

Stores booking details such as user info, doctor info, appointment date, uploaded documents, and status.


Installation & Setup:

1. Clone the repository

2. Navigate to the project folder


Backend Setup:

cd backend
npm install

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend server:

npm start

Frontend Setup:

cd frontend
npm install
npm start


Application Flow:

1. User registers and logs in


2. User views available doctors


3. User books an appointment


4. Admin approves doctor registrations


5. Doctor manages appointment requests


6. User receives updates and can track booking status



Future Enhancements:

Online payment integration

Video consultation feature

Mobile application support

Advanced search & filtering


Conclusion:

This project demonstrates the implementation of a real-world healthcare booking system using the MERN stack. It focuses on user convenience, efficient data handling, and role-based access control for better system management.

