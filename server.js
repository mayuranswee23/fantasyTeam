const mysql = require('mysql2'); 
const inquirer = require("inquirer");
const cTable = require('console.table');

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
            console.log('View Clubs')
            break; 
        case 'View Positions':
            console.log('View Positions');
            break;
        case 'View Players':
            console.log('View Players');
            break;    
        case 'Add Club':
            console.log('Add Club');
            break;
        case 'Add Position':
            console.log('Add Position');
            break;
        case 'Add Player':
            console.log('Add Player');
            break;
        case 'Update Player':
            console.log('Update Player');
            break;
        case 'Exit':
            console.log('Bye!');
            break;       
    }
})
}

showPrompts();