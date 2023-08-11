const createPlatesTags =  `

;CREATE TABLE IF NOT EXISTS plates_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    id_plate INTEGER NOT NULL,
    FOREIGN KEY (id_plate) REFERENCES plates(id)
    );

`;

module.exports = createPlatesTags
 
