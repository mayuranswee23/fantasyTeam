DROP TABLE IF EXISTS clubs; 
DROP TABLE IF EXISTS field_positions; 
DROP TABLE IF EXISTS players; 

CREATE TABLE clubs (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    player_name VARCHAR(30) NOT NULL
);

CREATE TABLE field_positions (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    positions VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2)
);

CREATE TABLE players (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    club_id INTEGER NOT NULL,
    positions_id INTEGER NOT NULL, 
    CONSTRAINT fk_clubs FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE, 
    CONSTRAINT fk_field_positions FOREIGN KEY (positions_id) REFERENCES field_positions(id) ON DELETE CASCADE
);
