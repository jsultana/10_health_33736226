-- Use the health database
USE health;

-- Insert default user for marking
-- username: gold
-- password: smiths123ABC$
INSERT INTO users (username, password_hash)
VALUES ('gold', 'smiths123ABC$');

-- Insert some example workouts for the gold user
-- (We'll assume this user gets id = 1 after insert)
INSERT INTO workouts (user_id, workout_date, workout_type, duration_minutes, notes)
VALUES
(1, '2025-01-01', 'Running', 30, 'Morning run in the park'),
(1, '2025-01-02', 'Yoga', 45, 'Evening stretch and relaxation'),
(1, '2025-01-03', 'Strength Training', 40, 'Upper body workout at the gym');
