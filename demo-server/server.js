const express = require('express');
const sqlite = require('better-sqlite3');
const cors = require('cors');

const app = express();
const port = 3001;

const path = require('path');
const dbPath = path.resolve(__dirname, 'db.sqlite3');
const db = new sqlite(dbPath);

// Enable CORS
app.use(cors());

app.get('/api/data', (req, res) => {
  try {
    const userInput = req.query.userInput || ''; // Get user input from the query parameters
    console.log(userInput)
    const query = 'SELECT nev, tid FROM templomok WHERE varos LIKE ?';
    const data = db.prepare(query).all(`%${userInput}%`);

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/churchNames', (req, res) => {
  try {
    console.log(db.name);
    const query = 'SELECT DISTINCT nev FROM templomok';
    const data = db.prepare(query).all();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/cities', async (req, res) => {
  try {
    const query = 'SELECT DISTINCT varos FROM templomok WHERE varos IS NOT NULL';
    const data = db.prepare(query).all();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/churches', async (req, res) => {
  try {
    const queryString = req.query.city;
    console.log('/api/churches: ' + queryString);

    const query = "SELECT * FROM templomok WHERE varos LIKE ? ";

    const templomokStatement = db.prepare(query);
    const templomokData = templomokStatement.all(`%${queryString}%`);

    const fetchMisekAndKepek = async (church) => {
      const misekQuery = "SELECT * FROM misek WHERE tid = ?";
      const kepekQuery = "SELECT * FROM kepek WHERE tid = ?";

      const [misek, kepek] = await Promise.all([
        db.prepare(misekQuery).all(church.tid),
        db.prepare(kepekQuery).all(church.tid),
      ]);

      return { ...church, misek, kepek };
    };

    const result = await Promise.all(templomokData.map(fetchMisekAndKepek));
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
