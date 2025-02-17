Employee Onboarding System
==========================

A modern web application for managing employee onboarding information with a user-friendly interface for data submission and viewing. Built with Node.js, Express.js, and MySQL.

🚀 Features
-----------

-   **Employee Data Submission**

    -   Personal Information

    -   Bank Details

    -   Emergency Contact Information

    -   Additional Health/Medical Information

    -   Real-time Form Validation

    -   Responsive Design

-   **Data Management**

    -   View All Submissions

    -   Search Functionality

    -   Detailed Information in Modal Popups

    -   Secure Data Storage

🛠️ Technologies Used
---------------------

-   **Frontend**

    -   HTML5

    -   CSS3

    -   JavaScript (ES6+)

    -   Bootstrap 5.1.3

-   **Backend**

    -   Node.js

    -   Express.js

    -   MySQL2

-   **Additional Tools**

    -   dotenv (Environment Variables)

    -   CORS (Cross-Origin Resource Sharing)

📋 Prerequisites
----------------

Before you begin, ensure you have the following installed:

-   Node.js (v14.0.0 or higher)

-   MySQL (v5.7 or higher)

-   npm (usually comes with Node.js)

🔧 Installation
---------------

1.  **Clone the repository**

```
git clone https://github.com/yourusername/employee-onboarding.git
cd employee-onboarding

```

CopyInsert at cursorbash

1.  **Install dependencies**

```
npm install

```

CopyInsert at cursorbash

1.  **Set up environment variables **Create a 

    ```
    .env
    ```

     file in the root directory and add:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=employee_onboarding
PORT=3000

```

CopyInsert at cursorenv

1.  **Set up the database**

```
CREATE DATABASE employee_onboarding;
USE employee_onboarding;

CREATE TABLE employee_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    ni_number VARCHAR(15) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    sort_code VARCHAR(8) NOT NULL,
    account_number VARCHAR(10) NOT NULL,
    emergency_contact_name VARCHAR(255) NOT NULL,
    emergency_contact_number VARCHAR(20) NOT NULL,
    health_issues TEXT,
    additional_info TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

CopyInsert at cursorsql

1.  **Start the server**

```
npm start

```

CopyInsert at cursorbash

The application will be available at 

```
http://localhost:3000
```

📁 Project Structure
--------------------

```
employee-onboarding/
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── submissions.css
│   ├── js/
│   │   ├── script.js
│   │   └── submissions.js
│   ├── index.html
│   └── submissions.html
├── server.js
├── package.json
├── .env
└── README.md

```

CopyInsert at cursortext

🔍 Usage
--------

1.  **Submit Employee Information**

    -   Navigate to the home page ( 

        ```
        /
        ```

        )
    -   Fill out the form with employee details

    -   Submit the form

    -   Receive confirmation of successful submission

2.  **View Submissions**

    -   Navigate to the submissions page ( 

        ```
        /submissions.html
        ```

        )
    -   View all employee submissions in a table format

    -   Use the search function to find specific employees

    -   Click "View" links to see detailed information

🔒 Security Features
--------------------

-   SQL Injection Prevention using Prepared Statements

-   Input Validation and Sanitization

-   Environment Variables for Sensitive Data

-   XSS Protection

-   CORS Configuration

💡 API Endpoints
----------------

### POST 

```
/api/submit
```

Submit new employee data

-   Request Body: Employee information

-   Response: Success/Error message with ID

### GET 

```
/api/employees
```

Retrieve employee data

-   Query Parameters: 

    ```
    search
    ```

     (optional)
-   Response: Array of employee records

🎨 Styling
----------

The application uses a consistent color scheme and modern design:

-   Primary Color: 

    ```
    #2ed573
    ```

-   Dark Shade: 

    ```
    #26b863
    ```

-   Text Color: 

    ```
    #2c3e50
    ```

-   Background: 

    ```
    #f9fafb
    ```

-   Border Color: 

    ```
    #e0e0e0
    ```

📱 Responsive Design
--------------------

The application is fully responsive and works on:

-   Desktop computers

-   Tablets

-   Mobile phones

🔄 Future Improvements
----------------------

-   User Authentication

-   File Upload for Documents

-   Email Notifications

-   Data Export Functionality

-   Admin Dashboard

-   Activity Logging

-   Data Backup System

🐛 Known Issues
---------------

Currently, there are no known issues. Please report any bugs in the Issues section.

🤝 Contributing
---------------

1.  Fork the repository

2.  Create your feature branch ( 

    ```
    git checkout -b feature/AmazingFeature
    ```

    )
3.  Commit your changes ( 

    ```
    git commit -m 'Add some AmazingFeature'
    ```

    )
4.  Push to the branch ( 

    ```
    git push origin feature/AmazingFeature
    ```

    )
5.  Open a Pull Request

📄 License
----------

This project is licensed under the MIT License - see the LICENSE.md file for details

👥 Authors
----------

-   Neil - *Initial work*- d-sumanth

🙏 Acknowledgments
------------------

-   Bootstrap team for the amazing framework

-   Node.js community for excellent documentation

-   All contributors who help improve this project

📞 Contact
----------

Your Name - @D-sumanth - sumanthdev03@gmail.com

Project Link: https://github.com/yourusername/employee-onboarding

* * * * *

⌨️ with ❤️ by Your Name
