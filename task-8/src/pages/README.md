# Task 8: User Authentication

## Overview
This module implements user authentication using NextAuth, including signup, signin, and email verification pages. It integrates with the provided API endpoints for user registration and authentication.

## Pages & Features
- **Signup Page:** Allows users to register with name, email, password, confirm password, and role. Displays error/success messages and validates input.
- **Signin Page:** Allows users to log in with email and password. Displays error/success messages and shows access token on success.
- **Verify Email Page:** Allows users to verify their email using an OTP sent to their email address.

## Screenshots
- **Signup Page:**
  ![Signup Screenshot](../screenshoots/signup.png)
  *User registration form with validation and feedback.*
- **Signin Page:**
  ![Signin Screenshot](../screenshoots/signin.png)
  *User login form with error handling and token display.*
- **Verify Email Page:**
  ![Verify Email Screenshot](../screenshoots/verify-email.png)
  *OTP input for email verification.*

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/dagm24/A2SV-Web-Project.git
   cd A2SV-Web-Project/task-8
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit `http://localhost:3000` to view the authentication pages.

## API Endpoints
- **Signup:** `POST /signup`
- **Verify Email:** `POST /verify-email`
- **Sign In:** `POST /login`

## Customization
- Update UI components in `src/pages/` to change layout or styles.
- Modify API logic in each page to match backend changes.
- Add more validation or error handling as needed.

## License
This project is for educational purposes and is not licensed for commercial use.
