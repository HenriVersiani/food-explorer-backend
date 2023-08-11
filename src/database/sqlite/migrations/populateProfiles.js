const createPopulate = `
;INSERT OR IGNORE INTO profiles (id,isAdmin,description) VALUES (1,true,'ADMINISTRATOR') ;
;INSERT OR IGNORE INTO profiles (id,isAdmin,description) VALUES (2,false,'USER');
`;

module.exports = createPopulate