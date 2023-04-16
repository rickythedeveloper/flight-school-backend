DROP SCHEMA IF EXISTS data;
CREATE SCHEMA data;

CREATE TABLE data.example_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

INSERT INTO data.example_table (name, age) VALUES ('hello', 15);

GRANT USAGE ON SCHEMA data to flight_school_backend;
GRANT ALL ON data.example_table to flight_school_backend;
GRANT ALL ON data.example_table_id_seq to flight_school_backend;