# Chaitra Foundation - Clothing Donation Platform

A web application for the Chaitra Foundation NGO that facilitates clothing donations with user authentication and email/SMS notifications.

## Features

- User Authentication (Register/Login)
- Clothing Donation Management
- Email and SMS Confirmations
- Responsive Material-UI Design
- Secure API Endpoints

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JWT
- Notifications: Nodemailer (Email) & Twilio (SMS)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account (for email notifications)
- Twilio account (for SMS notifications)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a .env file in the backend directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/chaitra_foundation
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at http://localhost:3000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Donations
- POST /api/donations - Create a new donation
- GET /api/donations/my-donations - Get user's donations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
