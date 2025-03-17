require('dotenv').config();
const mysql = require('mysql');

const DB_NAME = process.env.DB_NAME;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');

  db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists.');

    db.query(`USE ${DB_NAME}`, (err, result) => {
      if (err) throw err;

      const createAnalyticsTableQuery = `
        CREATE TABLE IF NOT EXISTS analytics (
          id INT AUTO_INCREMENT PRIMARY KEY,
          embed_id VARCHAR(255) NOT NULL,
          page VARCHAR(255) NOT NULL,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          user_agent VARCHAR(255),
          referrer VARCHAR(255),
          time_spent FLOAT,
          country VARCHAR(255)
        )
      `;

      const createEmbedLinksTableQuery = `
        CREATE TABLE IF NOT EXISTS embed_links (
          id VARCHAR(255) PRIMARY KEY,
          embed_link TEXT NOT NULL,
          selected_option VARCHAR(255) NOT NULL,
          title VARCHAR(255),
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.query(createAnalyticsTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Analytics table created or already exists.');

        db.query(createEmbedLinksTableQuery, (err, result) => {
          if (err) throw err;
          console.log('Embed links table created or already exists.');
          db.end();
        });
      });
    });
  });
});