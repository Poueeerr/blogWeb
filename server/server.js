const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db"); 

app.use(cors({ origin: ["http://localhost:5173"] })); 
app.use(express.json());

app.get("/api", async (req, res) => {
  try {
    const query = "SELECT id, texto, data_criacao FROM clients ORDER BY id";
    const queryRes = await db.query(query);
    res.status(200).json(queryRes.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.post("/api", async (req, res) => {
  const { texto } = req.body; 
  if (!texto) {
    return res.status(400).json({ message: "Texto is required" });
  }

  try {
    const query = `
      INSERT INTO clients (texto) 
      VALUES ($1) 
      RETURNING id, texto, data_criacao
    `;
    const result = await db.query(query, [texto]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" });
  }
});

app.delete("/api/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM clients WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(3003, () => {
  console.log("Server started on port 3003");
});
