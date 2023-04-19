DROP SCHEMA IF EXISTS data;
CREATE SCHEMA data;

CREATE TABLE data.aircraft (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    registration VARCHAR(16)
);

CREATE TABLE data.instructors (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(64)
);

CREATE TABLE data.bookings (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    instructor_id INT REFERENCES data.instructors(id),
    aircraft_id INT REFERENCES data.aircraft(id)
);

GRANT USAGE ON SCHEMA data TO flight_school_backend;
GRANT ALL ON
    data.aircraft,
    data.instructors,
    data.bookings
TO flight_school_backend;

INSERT INTO data.aircraft (registration)
VALUES ('G-BHAI'), ('G-BFLU');

INSERT INTO data.instructors (name)
VALUES ('John Smith'), ('Alice Martin');