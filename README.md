# Udaan Lead Management

## Table of Contents

- [Project Overview](#project-overview)
- [System Requirements](#system-requirements)
- [Installation Instructions](#installation-instructions)
- [Running Instructions](#running-instructions)
- [Test Execution Guide](#test-execution-guide)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Interactions](#interactions)
  - [Restaurants](#restaurants)
- [Sample Usage Examples](#sample-usage-examples)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

**Udaan Lead Management** is a comprehensive web application designed to streamline the management of interactions between users and restaurants. It enables users to efficiently handle various types of interactions such as calls, emails, and orders, providing insightful performance metrics to monitor and enhance engagement strategies.

### Key Features

- **User Authentication:** Secure login and registration system.
- **Interaction Management:** Create, view, and manage Calls, Emails, and Orders associated with restaurants.
- **Dashboard:** Interactive dashboard displaying Today's Tasks, Performance Metrics, and Summary Statistics.
- **Performance Metrics:** Categorize restaurants into Well-Performing and Underperforming based on interaction counts.
- **Filtering:** Exclude interactions with "Unknown Restaurant" and "Unknown Contact" to maintain data integrity.
- **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.
- **Notifications:** Real-time feedback using React Toastify.

---

## System Requirements

### Backend

- **Operating System:** Windows, macOS, or Linux
- **Node.js:** v14.x or higher
- **npm:** v6.x or higher
- **MongoDB:** v4.x or higher

### Frontend

- **Operating System:** Windows, macOS, or Linux
- **Node.js:** v14.x or higher
- **npm:** v6.x or higher

### Development Tools

- **Git:** v2.x or higher
- **Code Editor:** VS Code or any preferred editor

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/udaan-lead-management.git](https://github.com/immo7932/Udaan-Lead-Management-System)
cd udaan-lead-management
```

### 2. Setup Backend

#### a. Navigate to Backend Directory

```bash
cd backend
```

#### b. Install Dependencies

```bash
npm install
```

#### c. Configure Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://reader7932:Imranalam123@cluster0.ozx6exi.mongodb.net/Udaan
JWT_SECRET=your_jwt_secret

```

### 3. Setup Frontend

#### a. Navigate to Frontend Directory

```bash
cd ../frontend
```

#### b. Install Dependencies

```bash
npm install
```

#### c. Configure Environment Variables

Create a `.env` file in the `frontend` directory and add the following variables:

```env
REACT_APP_API_URL=http://localhost:5000/api

---

## Running Instructions

### 1. Start Backend Server

#### a. Navigate to Backend Directory

```bash
cd backend
```

#### b. Start the Server

```bash
npm run dev
```

*This uses `nodemon` for development. For production, use `npm start`.*

### 2. Start Frontend Server

#### a. Navigate to Frontend Directory

```bash
cd ../frontend
```

#### b. Start the React App

```bash
npm start
```

*This will open the application in your default browser at `http://localhost:3000`.*

---

## Test Execution Guide

### 1. Backend Tests

#### a. Navigate to Backend Directory

```bash
cd backend
```

#### b. Run Tests

```bash
npm test
```

*This will execute the test suites using Jest and Supertest.*

### 2. Frontend Tests

#### a. Navigate to Frontend Directory

```bash
cd ../frontend
```

#### b. Run Tests

```bash
npm test
```

*This will launch the test runner in interactive watch mode using Jest and React Testing Library.*

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

#### **Register User**

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "timezone": "Asia/Kolkata"
  }
  ```

- **Responses:**
  - **201 Created**

    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "timezone": "Asia/Kolkata"
      }
    }
    ```

  - **400 Bad Request**

    ```json
    {
      "message": "User already exists"
    }
    ```

#### **Login User**

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate an existing user.
- **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Responses:**
  - **200 OK**

    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "timezone": "Asia/Kolkata"
      }
    }
    ```

  - **401 Unauthorized**

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Interactions

#### **Get Today's Interactions**

- **URL:** `/calls/today`
- **Method:** `GET`
- **Description:** Retrieve today's interactions (Calls, Emails, Orders) for the logged-in user, excluding those with "Unknown Restaurant" or "Unknown Contact".
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Responses:**
  - **200 OK**

    ```json
    {
      "interactions": [
        {
          "_id": "interaction_id",
          "type": "Call",
          "restaurantName": "Restaurant A",
          "contactName": "Alice Smith",
          "time": "14:30",
          "details": "Discussed new menu items",
          "status": "Completed"
        },
        // More interactions...
      ],
      "grouped": {
        "calls": [/* Call interactions */],
        "emails": [/* Email interactions */],
        "orders": [/* Order interactions */]
      },
      "summary": {
        "totalInteractions": 15,
        "callsCount": 5,
        "emailsCount": 7,
        "ordersCount": 3,
        "completedCount": 10,
        "pendingCount": 5
      },
      "timezone": "Asia/Kolkata",
      "performanceMetrics": {
        "wellPerforming": [
          {
            "_id": "restaurant_id",
            "name": "Restaurant A",
            "interactions": 12
          }
        ],
        "underPerforming": [
          {
            "_id": "restaurant_id",
            "name": "Restaurant B",
            "interactions": 6
          }
        ],
        "message": "No interactions found for the current month up to today."
      }
    }
    ```

  - **401 Unauthorized**

    ```json
    {
      "message": "Not authorized"
    }
    ```

#### **Get Interactions for a Specific Restaurant**

- **URL:** `/restaurants/:restaurantId/interactions`
- **Method:** `GET`
- **Description:** Retrieve all interactions associated with a specific restaurant, excluding those with "Unknown Contact" or "Unknown Restaurant".
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Parameters:**
  - `restaurantId` (path parameter) – ID of the restaurant.
- **Responses:**
  - **200 OK**

    ```json
    [
      {
        "_id": "interaction_id",
        "type": "Email",
        "restaurantName": "Restaurant A",
        "contactName": "Bob Johnson",
        "contactRole": "Manager",
        "contactEmail": "bob@restauranta.com",
        "contactPhone": "123-456-7890",
        "userName": "John Doe",
        "userEmail": "john@example.com",
        "date": "2024-04-25T14:30:00.000Z",
        "details": "Sent promotional materials",
        "status": "Completed",
        "time": "14:30"
      },
      // More interactions...
    ]
    ```

  - **404 Not Found**

    ```json
    {
      "message": "Restaurant not found"
    }
    ```

  - **401 Unauthorized**

    ```json
    {
      "message": "Not authorized"
    }
    ```

### Restaurants

#### **Create a New Restaurant**

- **URL:** `/restaurants`
- **Method:** `POST`
- **Description:** Create a new restaurant and assign it to the logged-in user.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**

  ```json
  {
    "name": "Restaurant A",
    "address": "123 Main Street",
    "phone": "123-456-7890"
  }
  ```

- **Responses:**
  - **201 Created**

    ```json
    {
      "_id": "restaurant_id",
      "name": "Restaurant A",
      "address": "123 Main Street",
      "phone": "123-456-7890",
      "assignedTo": "user_id",
      "createdAt": "2024-04-25T10:00:00.000Z",
      "updatedAt": "2024-04-25T10:00:00.000Z"
    }
    ```

  - **400 Bad Request**

    ```json
    {
      "message": "Restaurant already exists"
    }
    ```

#### **Get All Restaurants Assigned to User**

- **URL:** `/restaurants`
- **Method:** `GET`
- **Description:** Retrieve all restaurants assigned to the logged-in user.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Responses:**
  - **200 OK**

    ```json
    [
      {
        "_id": "restaurant_id",
        "name": "Restaurant A",
        "address": "123 Main Street",
        "phone": "123-456-7890",
        "assignedTo": "user_id",
        "createdAt": "2024-04-25T10:00:00.000Z",
        "updatedAt": "2024-04-25T10:00:00.000Z"
      },
      // More restaurants...
    ]
    ```

  - **401 Unauthorized**

    ```json
    {
      "message": "Not authorized"
    }
    ```

---

## Sample Usage Examples

### 1. Registering a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "timezone": "Asia/Kolkata"
}'
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "timezone": "Asia/Kolkata"
  }
}
```

### 2. Logging In

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "timezone": "Asia/Kolkata"
  }
}
```

### 3. Creating a New Restaurant

```bash
curl -X POST http://localhost:5000/api/restaurants \
-H "Content-Type: application/json" \
-H "Authorization: Bearer jwt_token_here" \
-d '{
  "name": "Restaurant A",
  "address": "123 Main Street",
  "phone": "123-456-7890"
}'
```

**Response:**

```json
{
  "_id": "restaurant_id",
  "name": "Restaurant A",
  "address": "123 Main Street",
  "phone": "123-456-7890",
  "assignedTo": "user_id",
  "createdAt": "2024-04-25T10:00:00.000Z",
  "updatedAt": "2024-04-25T10:00:00.000Z"
}
```

### 4. Fetching Today's Interactions

```bash
curl -X GET http://localhost:5000/api/calls/today \
-H "Authorization: Bearer jwt_token_here"
```

**Response:**

```json
{
  "interactions": [
    {
      "_id": "interaction_id",
      "type": "Call",
      "restaurantName": "Restaurant A",
      "contactName": "Alice Smith",
      "time": "14:30",
      "contactId" : "ref Contact"
      "details": "Discussed new menu items",
      "status": "Completed"
    }
    // More interactions...
  ],
  "grouped": {
    "calls": [/* Call interactions */],
    "emails": [/* Email interactions */],
    "orders": [/* Order interactions */]
  },
  "summary": {
    "totalInteractions": 15,
    "callsCount": 5,
    "emailsCount": 7,
    "ordersCount": 3,
    "completedCount": 10,
    "pendingCount": 5
  },
  "timezone": "Asia/Kolkata",
  "performanceMetrics": {
    "wellPerforming": [
      {
        "_id": "restaurant_id",
        "name": "Restaurant A",
        "interactions": 12
      }
    ],
    "underPerforming": [
      {
        "_id": "restaurant_id",
        "name": "Restaurant B",
        "interactions": 6
      }
    ],
    "message": "No interactions found for the current month up to today."
  }
}
```

### 5. Fetching Interactions for a Specific Restaurant

```bash
curl -X GET http://localhost:5000/api/restaurants/restaurant_id/interactions \
-H "Authorization: Bearer jwt_token_here"
```

**Response:**

```json
[
  {
    "_id": "interaction_id",
    "type": "Email",
    "restaurantName": "Restaurant A",
    "contactName": "Bob Johnson",
    "contactRole": "Manager",
    "contactEmail": "bob@restauranta.com",
    "contactPhone": "123-456-7890",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "date": "2024-04-25T14:30:00.000Z",
    "details": "Sent promotional materials",
    "status": "Completed",
    "time": "14:30"
  }
  // More interactions...
]
```

---

## Technologies Used

### Frontend

- **React:** Frontend library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Axios:** Promise-based HTTP client for API requests.
- **Moment.js & Moment-Timezone:** Date manipulation and timezone support.
- **Lucide React:** Icon library for React components.
- **React Toastify:** Notifications library for React.

### Backend

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database for data storage.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
- **Moment.js & Moment-Timezone:** Date manipulation and timezone support.
- **JWT (JSON Web Tokens):** Authentication mechanism.

### Development Tools

- **Git:** Version control system.
- **Nodemon:** Utility that automatically restarts the server on code changes (development only).
- **Jest & Supertest:** Testing frameworks for backend.
- **React Testing Library:** Testing utilities for React components.

---

## Contributing

Contributions are welcome! Please follow these steps to contribute to the project:

1. **Fork the Repository**

   Click the [Fork](https://github.com/immo7932/Udaan-Lead-Management-System) button at the top right corner of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/immo7932/Udaan-Lead-Management-System
   cd udaan-lead-management
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**

   Implement your feature or fix the bug.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request**

   Navigate to the original repository and click on the **Compare & pull request** button.

---


## Contact

For any inquiries or feedback, please contact [john@example.com](ialam7932@gmail.com).

```
