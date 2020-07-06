# SatTrace  
### [Live demo](https://jbatistareis.github.io/sattrace/)  
**Path information on this demo is outdated as of 2018*  

This is a simple satellite tracker using Two-Line Element Sets (TLE), data can be input manually, of via plain text files found on [Celestrak](https://www.celestrak.com/) or [Space Track](https://www.space-track.org/).  

![SatTrace](screenshots/main.jpg)

### Instalation  
Clone the repository, then install [Node.js](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/).  
After that, run the database creation script on [database.sql](database.sql) (psql -f database.sql), then modify the file [database/_config.json](database/_config.json) with your connection information and rename it to `config.json`.  
Then finally, run `npm install` one time to download all dependencies, and `npm start` when you want to run the server.

### TODO
* Solar terminator
* Manual timezone
* Look angles
* Time pause and fast forward
