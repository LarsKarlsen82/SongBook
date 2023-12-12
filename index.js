import express from 'express'
import dotenv from 'dotenv'
import { SongRouter } from './Routes/song.router.js'
import ArtistRouter from './Controllers/artist.controller.js'


dotenv.config()


// TEST HENTE SONGS:

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

// ...........................................................................

// TESTE HENTE ARTISTER:

// import db from './Config/db.config.js'

// // Execute a database query to select titles from the 'song' table
// db.query(`SELECT * FROM artist`,  (err, result) => {
//   if (err) {
//     console.error('Error executing database query:', err);
//   } else {
//     console.log('Database Query Result:', result);
//   }

//   // Log the value of DB_PORT after the database query has completed
//   console.log('DB_PORT:', process.env.DB_PORT);
// });

// ...........................................................................

//TESTE HENTE SPECIFIK ARTIST:

import db from './Config/db.config.js'
const specificName = 'Bob Marley'

// Execute a database query to select titles from the 'song' table
db.query(`SELECT name FROM artist WHERE name = ?`, [specificName], (err, result) => {
  if (err) {
    console.error('Error executing database query:', err);
  } else {
    console.log(`Artists with the name '${specificName}':`, result);
  }

  // Log the value of DB_PORT after the database query has completed
  console.log('DB_PORT:', process.env.DB_PORT);
});

// ...........................................................................

// //TESTE ALLE INFO:

// // Importér databaseforbindelsen
// import db from './Config/db.config.js';

// // Udfør en databaseforespørgsel for at vælge titler fra 'song'-tabellen sammen med alle kolonner fra 'artist'-tabellen
// db.query(`
//   SELECT song.title, artist.*
//   FROM song
//   JOIN artist ON song.artist_id = artist.id
// `, (err, result) => {
//   if (err) {
//     console.error('Fejl ved udførelse af databaseforespørgsel:', err);
//   } else {
//     console.log('Databaseforespørgsel Resultat:', result);
//   }

//   // Log værdien af DB_PORT efter at databaseforespørgslen er fuldført
//   console.log('DB_PORT:', process.env.DB_PORT);
// });




const app = express();

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

app.use(SongRouter);

app.use(ArtistRouter);

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server kører på port http://localhost:${port}`);
});


console.log('DB_PORT:', process.env.DB_PORT);