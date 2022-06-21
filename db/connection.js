const mysql = require('mysql2'); 

const db = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root', 
        password: 'CoderBootcamp1!', 
        database: 'fantasyTeam'
    },
    console.log('Connected to the FantasyTeam database')
); 

module.exports = db; 