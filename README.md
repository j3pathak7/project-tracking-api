# Product Tracking API

This project is a RESTful API for tracking the status and location of products as they progress through various stages (e.g., manufacturing, shipping, delivery). The API allows customers to track their orders and administrators to manage and update the product status.

## Features

- User Authentication and Authorization
- Role-Based Access Control (admin, customer)
- CRUD Operations for Products
- Unique Tracking Numbers for Products
- CRUD Operations for Tracking Events
- Email Notifications for Product Status Changes

## Tech Stack

- Node.js
- Express
- MongoDB

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/j3pathak7/project-tracking-api.git
    cd project-tracking-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:

    ```plaintext
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The server should now be running on [http://localhost:5000](http://localhost:5000).

## API Endpoints

### Authentication Endpoints

1. **Register User**
   - Description: Register a new user.
   - Method: POST
   - URL: `{{url}}/auth/register`
   - Request Body:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - Response:
     - Status: 201 Created
     - Body:
       ```json
       { "message": "User registered successfully" }
       ```

2. **Login User**
   - Description: Log in an existing user.
   - Method: POST
   - URL: `{{url}}/auth/login`
   - Request Body:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - Response:
     - Status: 200 OK
     - Body:
       ```json
       { "token": "string" }
       ```

### Product Management Endpoints

3. **Create Product**
   - Description: Create a new product.
   - Method: POST
   - URL: `{{url}}/products`
   - Request Body:
     ```json
     {
       "name": "string",
       "description": "string"
     }
     ```
   - Response:
     - Status: 201 Created
     - Body:
       ```json
       { "message": "Product created successfully", "product": { "id": "string", "name": "string", "description": "string" } }
       ```

4. **Get All Products**
   - Description: Retrieve a list of all products.
   - Method: GET
   - URL: `{{url}}/products`
   - Response:
     - Status: 200 OK
     - Body:
       ```json
       [ { "id": "string", "name": "string", "description": "string" } ]
       ```

5. **Get Product by ID**
   - Description: Retrieve a specific product by its ID.
   - Method: GET
   - URL: `{{url}}/products/:id`
   - Response:
     - Status: 200 OK
     - Body:
       ```json
       { "id": "string", "name": "string", "description": "string" }
       ```

6. **Update Product**
   - Description: Update an existing product.
   - Method: PUT
   - URL: `{{url}}/products/:id`
   - Request Body:
     ```json
     {
       "name": "string",
       "description": "string"
     }
     ```
   - Response:
     - Status: 200 OK
     - Body:
       ```json
       { "message": "Product updated successfully" }
       ```

7. **Delete Product**
   - Description: Delete an existing product.
   - Method: DELETE
   - URL: `{{url}}/products/:id`
   - Response:
     - Status: 200 OK
     - Body:
       ```json
       { "message": "Product deleted successfully" }
       ```

### Tracking Status Endpoints

8. **Add Tracking Event**
   - Description: Add a new tracking event for a product.
   - Method: POST
   - URL: `{{url}}/trackings`
   - Request Body:
     ```json
     {
       "productId": "string",
       "status": "string",
       "location": "string"
     }
     ```
   - Response:
     - Status: 201 Created
     - Body:
       ```json
       { "message": "Tracking event added successfully", "trackingEvent": { "id": "string", "productId": "string", "status": "string", "location": "string", "timestamp": "string" } }
       ```

9. **Get Tracking Events for Product**
   - Description: Retrieve all tracking events for a specific product.
   - Method: GET
   - URL: `{{url}}/trackings/:productId`
   - Response:
     - Status: 200 OK
     - Body:
       ```json
       [ { "id": "string", "status": "string", "location": "string", "timestamp": "string" } ]
       ```

10. **Update Tracking Event**
    - Description: Update an existing tracking event.
    - Method: PUT
    - URL: `{{url}}/trackings/:id`
    - Request Body:
      ```json
      {
        "status": "string",
        "location": "string"
      }
      ```
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        { "message": "Tracking event updated successfully" }
        ```

11. **Delete Tracking Event**
    - Description: Delete an existing tracking event.
    - Method: DELETE
    - URL: `{{url}}/trackings/:id`
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        { "message": "Tracking event deleted successfully" }
        ```

### Notification Endpoints

12. **Send Email Notification**
    - Description: Send an email notification to users when the product status changes.
    - Method: POST
    - URL: `{{url}}/notifications/email`
    - Request Body:
      ```json
      {
        "to": "string",
        "subject": "string",
        "body": "string"
      }
      ```
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        { "message": "Email notification sent successfully" }
        ```

## API Documentation

API documentation is available through Postman: [Product Tracking API Documentation](https://documenter.getpostman.com/view/21565802/2sA3QqfsNP#1f666237-2d1b-4db3-bd7a-da2a41ed090d)
