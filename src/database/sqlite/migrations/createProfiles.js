const createProfiles = `
;CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY,
    isAdmin BOOLEAN,
    description VARCHAR,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
    );
`;

module.exports = createProfiles