const createPlates = `
;CREATE TABLE IF NOT EXISTS plates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    value INTEGER,
    description VARCHAR,
    avatar VARCHAR NULL,
    id_user INTEGER NOT NULL,
    id_category INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id)
    );
`;

module.exports = createPlates