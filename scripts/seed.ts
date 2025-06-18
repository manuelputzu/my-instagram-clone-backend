import db from "../src/core/database/client";

// Users-Tabelle befüllen
db.exec(`
  INSERT INTO users (username, email)
  VALUES 
    ('manuel', 'manuel@example.com');
`);

// Posts-Tabelle befüllen
db.exec(`
  INSERT INTO posts (imageUrl, caption, authorId)
  VALUES 
    ('https://picsum.photos/200', 'First post!', 1),
    ('https://picsum.photos/300', 'Hello InstaClone!', 1);
`);

console.log("📥 Datenbank erfolgreich befüllt.");

