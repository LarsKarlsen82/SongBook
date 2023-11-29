import express from 'express'
import dotenv from 'dotenv'
import { SongRouter } from './Routes/song.router.js'
import ArtistRouter from './Controllers/artist.controller.js'


dotenv.config()


// TEST HENTE SONGS

// import db from './Config/db.config.js'

// // Execute a database query to select titles from the 'song' table
// db.query(`SELECT title FROM song`, (err, result) => {
//   if (err) {
//     console.error('Error executing database query:', err);
//   } else {
//     console.log('Database Query Result:', result);
//   }

//   // Log the value of DB_PORT after the database query has completed
//   console.log('DB_PORT:', process.env.DB_PORT);
// });

// TESTE HENTE ARTISTER:

import db from './Config/db.config.js'

// Execute a database query to select titles from the 'song' table
db.query(`SELECT * FROM artist`, (err, result) => {
  if (err) {
    console.error('Error executing database query:', err);
  } else {
    console.log('Database Query Result:', result);
  }

  // Log the value of DB_PORT after the database query has completed
  console.log('DB_PORT:', process.env.DB_PORT);
});


const app = express()

app.use(express.json());

app.use(SongRouter);

app.use(ArtistRouter);

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server kører på port http://localhost:${port}`);
});


console.log('DB_PORT:', process.env.DB_PORT);