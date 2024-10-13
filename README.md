# Bookstore API

This is a simplified bookstore API built using Node.js, ExpressJS, Sequelize ORM, and MySQL. The API allows users to browse books, add books to a cart, place orders, and includes user authentication and authorization functionality.

## Features

- User registration and login with JWT authentication.
- CRUD operations for books.
- Add and remove books from a shopping cart.
- Place orders from the cart and view order history.
- JWT-based authentication and authorization.
- Proper validation and error handling using `express-validation` and `Joi`.

---

## Technologies

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MySQL** (Database)
- **JWT** (for Authentication)
- **Bcrypt.js** (for Password Hashing)
- **Joi** (for Validation)
- **express-validation** (for Input Validation)

---

## Requirements

- Node.js (v14+)
- MySQL Server
- Postman (for API testing)

---

1. **Clone the Repository**

   ```bash
   git clone ...
   cd bookstore-api
   ```

2. **Install Dependencies**

   Install the required dependencies using npm or yarn:

   ```bash
   npm install

   ```

3. **Environment Variables**

   Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   PORT=4200

   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=root
   DB_NAME=bookstore

   JWT_SECRET='my-jwt-screate'

   ```

4. **Run the Database Migrations**

   To run the migrations to your db please update the config/config.json file

Run all Migrations

```bash
npx sequelize-cli db:migrate
```

5. **Run the Application**

   Start the application in development mode:

   ```bash
   npm start
   ```

   The application will run by default on `http://localhost:4200`.
