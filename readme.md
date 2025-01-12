# Voucher System - Node.js with MySQL

## Overview
This Voucher System is a simple web application built using **Node.js**, **Express**, **MySQL**, **EJS**, and **express-session**. It allows users to generate and manage vouchers, including QR codes, PDF generation, and settings for custom voucher dimensions. Users can log in, view their dashboard, and customize voucher details for their personal use.

### Features:
- User login system with session management
- Dashboard displaying existing vouchers
- Generate a QR code with a unique 10-digit number
- Export vouchers as PDF
- Customizable voucher settings (expiry time, dimensions, fonts)
- Ability to print vouchers directly

## Tech Stack
- **Backend Framework**: Node.js with Express.js
- **Frontend**: EJS (Embedded JavaScript templates)
- **Database**: MySQL (using the `mysql2` npm package)
- **Session Management**: express-session
- **QR Code Generation**: `qrcode` npm package
- **PDF Generation**: Using custom libraries or `pdfkit`
- **CSS Framework**: None (Custom styling or can be integrated with TailwindCSS or Bootstrap)

## Requirements
Before running the project locally, ensure you have the following installed:
- Node.js (v14 or later)
- MySQL database (or MySQL server installed locally or via services like Render or AWS RDS)
- MySQL Workbench (optional for managing the database)

## Getting Started

### 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/yourusername/voucher-system.git
```

### 2. Install Dependencies

```bash
cd voucher-system
npm install
```

### 3. Set Up the Database

Create a new MySQL database and import the provided SQL schema into it. You can use MySQL Workbench or the command line to do this.

```bash
CREATE DATABASE voucher_system;
```
You will need to create tables for users, vouchers, and settings. 

### 4. Configure the Application

```bash
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=voucher_system
SESSION_SECRET=your_secret_key
DB_PORT=your_mysql_port
PORT=express_server_port
```

### 5. Run the Application

```bash
npm start
```

## Application Structure


### Description of Each Folder:


- **/public**: Contains static assets such as CSS, JavaScript files, and images.
- **/views**: Contains the EJS template files used for rendering the user interface.
- **/src**: Contains the core source code files.
  - **/controllers**: Contains route controllers for handling HTTP requests.
  - **/services**: Contains business logic such as voucher settings, QR code generation, etc.
  - **/models**: Contains the database schema and logic for interacting with the database.
  - **/config**: Contains configuration files for the database and other app settings.
  - **/constants**: Contains application constants (e.g., status codes, messages).
  - **/utils**: Contains utility functions and helper methods.
  - **/middlewares**: Contains middleware functions for processing requests (e.g., authentication, logging).
  - **/routes**: Contains the routing logic and endpoints.
  - **server.js**: The entry point of the application, where the server is initialized and configured, and the routes are connected.

### Features and Screenshots

#### 1. Login System
Users can log in with hardcoded credentials or a database.
Session management with express-session.
#### 2. Dashboard
View a list of vouchers.
Generate a QR code for a voucher.
#### 3. Generate QR Code
Click a button to generate a random 10-digit code and create a QR code.
#### 4. Settings Page
Users can set expiry time, voucher dimensions, and font sizes.
#### 5. PDF Generation
Export vouchers as PDF files with the voucher's details and QR code.
#### 6. Print Voucher
Print the generated PDF voucher directly.


### How to Contribute
#### 1. Fork the repository.
#### 2. Create a new branch (git checkout -b feature/your-feature).
### 3. Make your changes and commit them (git commit -am 'Add new feature').
#### 4. Push to the branch (git push origin feature/your-feature).
#### 5. Create a new pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.