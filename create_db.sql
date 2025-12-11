-- Drop and recreate the health database
DROP DATABASE IF EXISTS health;
CREATE DATABASE health;
USE health;

-- Users table (for login: gold / smiths etc)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- Workouts table (fitness tracker core)
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- optional: can be NULL if you don't use per-user filtering yet
    workout_date DATE NOT NULL,
    workout_type VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    notes TEXT,
    CONSTRAINT fk_workouts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);
