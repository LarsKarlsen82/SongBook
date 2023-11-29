// artist.controller.js
import express from 'express';
import db from '../Config/db.config.js';

const router = express.Router();

// GET: Liste alle artister
router.get('/artists', (req, res) => {
    // Hent alle kunstnere fra 'artist'-tabellen
    const sql = 'SELECT * FROM artist';

    db.query(sql, (err, result) => {
        if (err) {
            // Håndter fejl ved databaseforespørgsel
            return res.status(500).json({ error: 'Intern Serverfejl' });
        }

        // Returner listen over artister som et JSON-svar
        return res.json(result);
    });
});

// GET: artistdetaljer
router.get('/artists/:id', (req, res) => {
    // Uddrag artist ID fra forespørgselsparametrene
    const artistId = req.params.id;
    
    // Hent artistoplysninger fra 'artist'-tabellen baseret på kunstnerens ID
    const sql = 'SELECT * FROM artist WHERE id = ?';

    db.query(sql, [artistId], (err, result) => {
        if (err) {
            // Håndter fejl ved databaseforespørgsel
            return res.status(500).json({ error: 'Intern Serverfejl' });
        }

        // Kontroller, om artisten ikke blev fundet
        if (result.length === 0) {
            return res.status(404).json({ error: 'Kunstner ikke fundet' });
        }

        // Returner artistdetaljer som et JSON-svar
        return res.json(result[0]);
    });
});

// POST: Opret artist
router.post('/artists', (req, res) => {
    // Uddrag navn og genre fra forespørgselskroppen
    const { name, genre } = req.body;
    
    // Indsæt en ny artist i 'artist'-tabellen
    const sql = 'INSERT INTO artist (name, genre) VALUES (?, ?)';

    db.query(sql, [name, genre], (err, result) => {
        if (err) {
            // Håndter fejl ved databaseforespørgsel
            return res.status(500).json({ error: 'Intern Serverfejl' });
        }

        // Returner en succesbesked og ID'et for den nyoprettede artist
        return res.json({ message: 'Kunstner oprettet succesfuldt', artistId: result.insertId });
    });
});

// PUT: Opdater artist
router.put('/artists/:id', (req, res) => {
    // Uddrag artistens ID, navn og genre fra request parameters og body
    const artistId = req.params.id;
    const { name, genre } = req.body;
    
    // Opdater artistoplysninger i 'artist'-tabellen baseret på artistens ID
    const sql = 'UPDATE artist SET name = ?, genre = ? WHERE id = ?';

    db.query(sql, [name, genre, artistId], (err, result) => {
        if (err) {
            // Håndter fejl ved databaseforespørgsel
            return res.status(500).json({ error: 'Intern Serverfejl' });
        }

        // Kontroller, om artisten ikke blev fundet
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Kunstner ikke fundet' });
        }

        // Returner en succesbesked
        return res.json({ message: 'Kunstner opdateret succesfuldt' });
    });
});

// DELETE: Slet artist
router.delete('/artists/:id', (req, res) => {
    // Uddrag artistens ID fra request parameters
    const artistId = req.params.id;
    
    // Slet en artist fra 'artist'-tabellen baseret på artistens ID
    const sql = 'DELETE FROM artist WHERE id = ?';

    db.query(sql, [artistId], (err, result) => {
        if (err) {
            // Håndter fejl ved databaseforespørgsel
            return res.status(500).json({ error: 'Intern Serverfejl' });
        }

        // Kontroller, om artisten ikke blev fundet
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Kunstner ikke fundet' });
        }

        // Returner en succesbesked
        return res.json({ message: 'Kunstner slettet succesfuldt' });
    });
});

export default router;
