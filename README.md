# Flight School

## Zero to hero
- Download Node.
- [Set up the database](#set-up-the-database)
- Run `npm install` in the root folder.
- Set up automatic linting with your IDE (Run ESLint on save). Make sure to only lint the `/src` folder.
- Run `npm run start:dev` to start developing locally.

## Set up the database
1. Update `pg_hba.conf` to restrict access to `flight_school` databse 
   1. Find the `pg_hba.conf` file used by your Postgres server to define local authentication method. At the time of writing, this was found in `/Users/ricky/Library/Application Support/Postgres/var-15/pg_hba.conf`
   2. Add a line for each connection type with `flight_school` as the DATABASE and `all` as USER and `md5` as METHOD.
      After this, your pg_hba.config might look like the following:
      ```conf
      # TYPE  DATABASE        USER            ADDRESS                 METHOD
      
      # "local" is for Unix domain socket connections only
      local   flight_school   all                                     md5
      local   all             all                                     trust
      # IPv4 local connections:
      host    flight_school   all             127.0.0.1/32            md5
      host    all             all             127.0.0.1/32            trust
      # IPv6 local connections:
      host    flight_school   all             ::1/128                 md5
      host    all             all             ::1/128                 trust
      # Allow replication connections from localhost, by a user with the
      # replication privilege.
      local   replication     all                                     trust
      host    replication     all             127.0.0.1/32            trust
      host    replication     all             ::1/128                 trust
      ```
2. Run the following on terminal, replacing `<backend_password>` and `<admin_password>` with the actual passwords.
   ```
   psql -f db/setup/createDatabaseAndRoles.sql -v backend_password=<backend_password> -v admin_password=<admin_password> && psql -f db/setup/createTables.sql -d flight_school -U flight_school_admin
   ``` 
3. Set up database connection from WebStorm
    1. Set up the SQL dialect for the project (PostgreSQL)
    2. Set up the connection using the Database panel on the right