import db from '../Config/db.config.js';

class SongController {
  constructor() {
    console.log('Class SongController instantiated');
  }

  list = (req, res) => {
    console.log('Hent alle sange');
    const sql = `SELECT s.id, s.title, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id`;
    db.query(sql, (error, result) => {
      return res.json(result);
    });
  }

  details = (req, res) => {
    console.log('Hent detaljer');
    const { id } = req.params;
    const sql = `SELECT s.id, s.title, s.content, 
								s.artist_id, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						WHERE s.id = ${id}`;
    db.query(sql, (error, result) => {
      console.error(error);
      return res.json(result);
    });
  }

  create = (req, res) => {
    console.log('Oprette ny sang' , req.body);
    const { title, content, artist_id } = req.body;

  // Validate that required fields are present
  if (!title || !artist_id) {
    return res.status(400).json({ error: 'Title and artist_id are required fields' });
  }


    const sql = `INSERT INTO song (title, content, artist_id) 
                  VALUES (?, ?, ?)`;
    db.query(sql, [title, content, artist_id], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating song' });
      }
      return res.json({ message: 'Song created successfully', id: result.insertId });
    });
  }

  update = (req, res) => {
    console.log('Opdater sang');
    const { id, title, content, artist_id } = req.body;
    const sql = `UPDATE song 
                  SET title = ?, content = ?, artist_id = ? 
                  WHERE id = ?`;
    db.query(sql, [title, content, artist_id, id], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating song' });
      }
      return res.json({ message: 'Song updated successfully' });
    });
  }

  delete = (req, res) => {
    console.log('Slet sang');
    const { id } = req.body;
    const sql = `DELETE FROM song WHERE id = ?`;
    db.query(sql, [id], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error deleting song' });
      }
      return res.json({ message: 'Song deleted successfully' });
    });
  }
}

export default SongController;
