DROP DATABASE IF EXISTS flight_school;
DROP ROLE IF EXISTS flight_school_backend;
DROP ROLE IF EXISTS flight_school_admin;

CREATE DATABASE flight_school;
CREATE ROLE flight_school_backend
    PASSWORD :'backend_password'
    LOGIN;
CREATE ROLE flight_school_admin
    PASSWORD :'admin_password'
    LOGIN;

REVOKE CONNECT ON DATABASE flight_school FROM PUBLIC;
GRANT CONNECT ON DATABASE flight_school TO flight_school_backend;
GRANT ALL ON DATABASE flight_school TO flight_school_admin;