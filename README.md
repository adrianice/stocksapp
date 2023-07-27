# Stocks App

Stocks App is a web application built with React, PHP, and MongoDB. It allows users to save their favorite stocks.

## Installation and Setup

Before running the Stocks App, please ensure you meet the following requirements:

- PHP 8.0 (thread safe) must be available in your system's PATH.
- Composer must be installed and accessible through PHP 8.0.
- MongoDB with the mongo shell must be installed and available.
- Node.js must be installed.

Follow the steps below to set up and run the application:

1. **Clone the repository:**

```
git clone https://github.com/adrianice/stocksapp.git
cd stocks-app
```

2. **Database setup:**
- Open a terminal and start the MongoDB server using the `mongod` command.
- Open another terminal and access the MongoDB shell using the `mongosh` command.
- Run the following commands in the MongoDB shell to create the necessary database and collections:
  ```
  use stocks
  db.createCollection("users")
  db.createCollection("favoriteStocks")
  ```

3. **Backend setup:**
- Download the `php_mongodb.dll` extension for PHP from the following link: https://shorturl.at/el189 .
- Copy the `php_mongodb.dll` file to the `ext` folder of your PHP 8.0 installation.
- Edit the `php.ini` file of your PHP 8.0 installation and add the following line:
  ```
  extension=php_mongodb.dll
  ```
- Install the PHP dependencies by running the following command in the project's API directory:
  ```
  composer install
  ```

4. **Frontend setup:**
- Install the JavaScript dependencies by running the following command in the project's root directory:
  ```
  npm install
  ```

5. **Run the application:**
- Ensure the MongoDB server is still running (mongod).
- Open a terminal and start the backend server with the following command:
  ```
  php -S localhost:8000
  ```
- Open another terminal and run the frontend with the following command:
  ```
  npm run dev
  ```
- Access the application by visiting the link provided after running the frontend.

6. **Create a user:**
- After accessing the application, you can create a new user and log in.