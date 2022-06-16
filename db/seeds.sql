INSERT INTO clubs (player_name)
VALUES
('Real Madrid'), 
('Barcelona'),
('AC Milan'), 
('Inter Milan'), 
('Juventus'), 
('Arsenal'), 
('Manchester'), 
('Chelsea'), 
('PSG'), 
('Bayern');

INSERT INTO field_positions (positions, salary)
VALUES
('Goalkeeper', 100000.00), 
('Leftbacks', 50000.00), 
('Centerback', 80000.00), 
('Defensive Midfielder', 75000.00), 
('Central Midfielder', 70000.00), 
('Wingers', 85000.00), 
('Strikers', 90000.00);

INSERT INTO players (first_name, last_name, club_id, positions_id)
VALUES
('Cristiano', 'Ronaldo', 1, 7), 
('Leo', 'Messi', 2, 6), 
('Zlatan', 'Ibra', 3, 7), 
('Gio', 'Chiellini', 5, 3), 
('Romelu', 'Lukaku', 4, 7), 
('Mc', 'Fred', 7, 4), 
('Aaron', 'Ramsdale', 6, 1), 
('Ngolo', 'Kante', 8, 4), 
('Thomas', 'Muller', 10, 5), 
('Thiago', 'Silva', 9, 3);
