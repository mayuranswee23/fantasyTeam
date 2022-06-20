const mysql = require('mysql2'); 
const inquirer = require("inquirer");
const cTable = require('console.table');
const db = require('./db/connection')

function showPrompts(){
 return inquirer.prompt([
    {
        type: 'list', 
        message: 'Select an option from below', 
        name: 'options', 
        choices: ['View Clubs', 'View Positions', 'View Players', 'Add Club', 'Add Position', 'Add Player', 'Update Player', 'Exit']
    },
]).then(response => {
    const action = response.options; 
    switch(action){
        case 'View Clubs':
            viewClubs();
            break; 
        case 'View Positions':
            viewPositions();
            break;
        case 'View Players':
            viewPlayers()
            break;    
        case 'Add Club':
            addClub(); 
            break;
        case 'Add Position':
            addPosition();
            break;
        case 'Add Player':
            addPlayer();
            break;
        case 'Update Player':
            updatePlayer();
            break;
        case 'Exit':
            console.log('Bye!');
            break;       
    }
})
}

//view all clubs 
function viewClubs(){
    const sql = `SELECT * FROM clubs;`;

    db.query(sql, (err, res)=> {
        if (err){
            throw err
        }
        console.table(res);
        showPrompts()
    })
}


function viewPositions(){
    const sql = `SELECT * FROM field_positions;`;

    db.query(sql, (err, res)=>{
        if (err) throw err; 
        console.table(res)
        showPrompts();
    })
}

function viewPlayers(){
    const sql = `SELECT players.first_name, 
    players.last_name,
    clubs.player_name AS club_name, 
    field_positions.positions AS Position
    FROM players
    INNER JOIN clubs ON players.club_id = clubs.id
    INNER JOIN field_positions ON players.positions_id = field_positions.id;`

    db.query(sql, (err, res)=>{
        if (err) throw err; 
        console.table(res)
        showPrompts();
    })
}

function addClub(){
    inquirer.prompt([{
        name: 'clubName', 
        type: 'input', 
        message: 'Add a club'
        }
    ]).then( response =>{
    const club = response.clubName; 
    const sql = `INSERT INTO clubs (player_name) VALUES (?)`; 
    db.query(sql, club, (err, res)=>{
        if (err) throw err; 
        console.table(res)
        showPrompts();   
    })
    })
}

function addPosition(){
    inquirer.prompt([{
        name: 'positionRole', 
        type: 'input', 
        message: 'Add a position'
    }, 
    {
        name: 'salary', 
        type: 'input', 
        message: "Add position's salary"
    }
    ]).then (response =>{
    // const position = response.positionRole; 
    // const salary = response.salary;
    const sql = `INSERT INTO field_positions (positions, salary) 
    VALUES ('${response.positionRole}', ${response.salary})`; 
    db.query(sql, (err, res)=>{
        if (err) throw err; 
        console.table(res)
        showPrompts();   
    })
    })
}

function addPlayer(){
    const club = `SELECT * FROM clubs `; 
    db.query(club, (err, res)=>{
        if (err) throw err;  
    inquirer.prompt([
        {
            name: 'playerFirstName', 
            type: 'input',
            message: "What is the player's first name?"
        }, 
        {
            name: 'playerLastName', 
            type: 'input',
            message: "What is the player's last name?"
        }, 
        {
            name: 'playerClub', 
            type: 'list', 
            message: 'Which club does the player play for?',
            choices: res.map(res=> res.id + " " + res.player_name)
        }
    ]).then(response=>{
        let clubId = response.playerClub
        // .text.split('')[0]; 
        let idValue = clubId.split(' ')[0]
        console.log(idValue)
        let firstName = response.playerFirstName; 
        let lastName = response.playerLastName;
        const positions = `SELECT * FROM field_positions`;
        db.query(positions, (err, res)=>{
            if (err) throw err; 
        inquirer.prompt([
            {
                name: 'playerPosition', 
                type: 'list', 
                message: 'Which position does the player play?', 
                choices: res.map(res=> res.id + " " + res.positions)
            }
        ]). then( response =>{
        let positionId = response.playerPosition.split(' ')[0];
        console.log(clubId);
        // console.log(positionId)
        console.log(response);
        const sql = `INSERT INTO players (first_name, last_name, club_id, positions_id)
        VALUES ('${firstName}', '${lastName}',
         '${idValue}', ${positionId})`;
         db.query(sql, (err, res)=>{
            if (err) throw err; 
            console.table(res)
            showPrompts();   
        })
    })
        })
    })
})
}

function updatePlayer(){
    const sql = `SELECT 
    players.id,
    players.first_name, 
    players.last_name,
    clubs.player_name AS club_name, 
    clubs.id AS clubID, 
    field_positions.positions AS Position
    FROM players
    INNER JOIN clubs ON players.club_id = clubs.id
    INNER JOIN field_positions ON players.positions_id = field_positions.id;`

    db.query(sql, (err, res)=> {
        if (err) throw err; 
        const getRes = res;
        inquirer.prompt([
            {
                name: 'playerUpdate', 
                type: 'list', 
                message: 'Which player do you want to update?',
                choices: res.map(res=> "ID: " + res.id + " " + res.first_name + " " + res.last_name 
                + " Club: " + res.club_name + " Position: " + res.Position)
            }, 
            {
                name: 'updateField', 
                type: 'list', 
                message: 'What do you want to update?', 
                choices: ['First Name', 'Last Name', 'Club', 'Position']
            },
        ]).then(response => {
            const player = response.playerUpdate;
            const ID = player.split(' ')[1];
            const firstName = player.split(' ')[2];
            // console.log(firstName);
            const lastName = player.split(' ')[3];
            // console.log(lastName);
            const clubIDS = getRes.map(result=> result.clubID)[ID -1 || 0]; 
            // console.log(clubIDS);

            const clubNames = getRes.map(result => result.club_name)[ID-1]
            // console.log(clubNames);

            const playerPosition = getRes.map(result => result.Position)[ID-1]
            // console.log(playerPosition);

            const updates = response.updateField; 
            switch(updates){
                case 'First Name':
                    updateFirstName(ID);
                    break; 
                case 'Last Name':
                    updateLastName(ID);
                    break;
                case 'Club':
                    updateClub(ID);
                    break;
                case 'Position':
                    updatePosition(ID);
                    break;
            }        
        })
    })
}

function updateFirstName(id){
 inquirer.prompt([
     {
         name:'newName', 
         type: 'input', 
         message: 'Enter the new first name'
     }
 ]).then(response => {
     const sql = `UPDATE players SET first_name = '${response.newName}' WHERE id = ${id}`;
     db.query(sql, (err, res)=>{
         if (err) throw err; 
         console.log(res);
         console.table(res)
         showPrompts();
     })
 })
}

function updateLastName(id){
    inquirer.prompt([
        {
            name:'newLastName', 
            type: 'input', 
            message: 'Enter the new last name'
        }
    ]).then(response => {
        const sql = `UPDATE players SET last_name = '${response.newLastName}' WHERE id = ${id}`;
        db.query(sql, (err, res)=>{
            if (err) throw err; 
            console.table(res)
            showPrompts();
        })
    })
   }

function updateClub(id){
    const sql = `SELECT * FROM clubs`; 
    db.query(sql, (err, res)=>{
        if (err) throw err;
    inquirer.prompt([
        {
            name:'newClub', 
            type: 'list', 
            message: 'Choose the new Club',
            choices: res.map(res=> res.id + " " + res.player_name)
        }
    ]).then(response => {
        const clubID = response.newClub.split(' ')[0]
        const sql = `UPDATE players SET club_id = ${clubID} WHERE id = ${id}`;
        db.query(sql, (err, res)=>{
            if (err) throw err; 
            console.table(res)
            showPrompts();
        })
        })
    })
}

function updatePosition(id){
    const sql = `SELECT * FROM field_positions`; 
    db.query(sql, (err, res)=>{
        if (err) throw err;
    inquirer.prompt([
        {
            name:'newPosition', 
            type: 'list', 
            message: 'Choose the new Position',
            choices: res.map(res=> res.id + " " + res.positions)
        }
    ]).then(response => {
        const positionID = response.newPosition.split(' ')[0]
        const sql = `UPDATE players SET positions_id = ${positionID} WHERE id = ${id}`;
        db.query(sql, (err, res)=>{
            if (err) throw err; 
            console.table(res)
            showPrompts();
        })
        })
    })
}


showPrompts();