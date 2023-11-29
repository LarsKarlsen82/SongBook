// artist.controller.js
import express from 'express';
import db from '../Config/db.config.js';

const router = express.Router();

// GET: List alle artister
router.get('/artists', (req, res) => {
    // Fetch all artists from the 'artist' table
    const sql = 'SELECT * FROM artist';

    db.query(sql, (err, result) => {
        if (err) {
            // Handle database query error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the list of artists as a JSON response
        return res.json(result);
    });
});

// GET: Artist detaljer
router.get('/artists/:id', (req, res) => {
    // Extract artist ID from the request parameters
    const artistId = req.params.id;
    
    // Fetch artist details from the 'artist' table based on the artist ID
    const sql = 'SELECT * FROM artist WHERE id = ?';

    db.query(sql, [artistId], (err, result) => {
        if (err) {
            // Handle database query error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if the artist was not found
        if (result.length === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        // Return artist details as a JSON response
        return res.json(result[0]);
    });
});

// POST: Opret artist
router.post('/artists', (req, res) => {
    // Extract name and genre from the request body
    const { name, genre } = req.body;
    
    // Insert a new artist into the 'artist' table
    const sql = 'INSERT INTO artist (name, genre) VALUES (?, ?)';

    db.query(sql, [name, genre], (err, result) => {
        if (err) {
            // Handle database query error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return a success message and the ID of the newly created artist
        return res.json({ message: 'Artist created successfully', artistId: result.insertId });
    });
});

// PUT: Opdater artist
router.put('/artists/:id', (req, res) => {
    // Extract artist ID, name, and genre from the request parameters and body
    const artistId = req.params.id;
    const { name, genre } = req.body;
    
    // Update artist information in the 'artist' table based on the artist ID
    const sql = 'UPDATE artist SET name = ?, genre = ? WHERE id = ?';

    db.query(sql, [name, genre, artistId], (err, result) => {
        if (err) {
            // Handle database query error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if the artist was not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        // Return a success message
        return res.json({ message: 'Artist updated successfully' });
    });
});

// DELETE: Slet artist
router.delete('/artists/:id', (req, res) => {
    // Extract artist ID from the request parameters
    const artistId = req.params.id;
    
    // Delete an artist from the 'artist' table based on the artist ID
    const sql = 'DELETE FROM artist WHERE id = ?';

    db.query(sql, [artistId], (err, result) => {
        if (err) {
            // Handle database query error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if the artist was not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        // Return a success message
        return res.json({ message: 'Artist deleted successfully' });
    });
});

export default router;
