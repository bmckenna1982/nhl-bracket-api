CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    homeTeam TEXT NOT NULL,
    awayTeam TEXT NOT NULL,
    winner TEXT,
    duration INTEGER,
    points INTEGER NOT NULL,
    round INTEGER NOT NULL
);

CREATE TABLE picks (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE SET NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    pick_winner TEXT NOT NULL,
    pick_duration INTEGER
);