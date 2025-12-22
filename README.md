# Fitness Tracker – Coursework Application

This application is a simple **health and fitness tracking system** built using **Node.js, Express, MySQL, and EJS**.  
It allows users to:

- View a list of workouts  
- Add new workouts  
- Search workouts (server-side filtering against the database)  
- Navigate through a clean UI rendered with EJS templates  
- Store and retrieve data using a MySQL database  

This fulfils the coursework requirements for:

- Dynamic routing  
- Template rendering  
- Database interaction (SQL CRUD)  
- Server-side validation and sanitisation  
- Working search functionality (SQL-based search)  


---

## 1. Installation & Setup

### Requirements
- Node.js  
- MySQL  
- `.env` file containing:

HEALTH_HOST=localhost
HEALTH_USER=root
HEALTH_PASSWORD=yourpassword
HEALTH_DATABASE=health

## VM Deployment Note

The application was successfully deployed to the Goldsmiths VM and the
repository was cloned into the `public_html` directory.

However, MySQL user and database creation on the VM requires elevated
permissions which are not available to student accounts. As a result,
the database could not be created on the VM without sysadmin assistance.

The application runs correctly in a local environment, and all SQL
schema and setup files are included in this repository.

### doc413 MySQL access

On doc413, MySQL access appears restricted for student accounts:

- `mysql` returns: Access denied for user 'ssult001'@'localhost' (using password: NO)
- `mysql -u ssult001 -p` returns: Access denied for user 'ssult001'@'localhost' (using password: YES)

I do not have sudo access on doc413 to create/reset database users, so the DB cannot be created on the VM without sysadmin-provided credentials/host.
