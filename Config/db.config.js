
// Importér mysql-pakken for at oprette forbindelse til MySQL-databasen
import mysql from 'mysql'
// Importér dotenv-pakken for at indlæse konfigurationsvariabler fra .env-filen
import dotenv from 'dotenv'
dotenv.config();

// Opret forbindelse til MySQL-databasen med de konfigurerede oplysninger
const db  = mysql.createConnection( {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    port: process.env.DB_PORT
})

// Etablér forbindelse til MySQL-databasen
db.connect()

// Kommentar: Ovenstående kode opretter en forbindelse til en MySQL-database
// ved at bruge oplysninger fra miljøvariabler indlæst via dotenv-pakken.
// Herefter etableres selve forbindelsen ved at kalde db.connect().


// Eksporter databaseforbindelsen som standard for at gøre den tilgængelig i andre dele af programmet
export default db;

// Kommentar: Ovenstående kode eksporterer databaseforbindelsen (db) som standard,
// hvilket gør det muligt at importere og bruge den i andre dele af programmet.


