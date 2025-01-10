const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');

let storedVegetables = []; 

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());  

// GET route
app.get("/api", async (req, res) => {
    try{
        const query = 'SELECT texto, data_criacao FROM clients'
        const queryRes = await db.query(query);
        console.log(queryRes.rows)
        res.status(200).json(queryRes.rows); 
    }catch(error){
        console.log(error)
    }
});

// POST route
app.post("/api", async (req, res) => {
    const data = req.body.data; 
    console.log(data)
    try{
        const userQuery = 'INSERT INTO clients (texto) VALUES ($1)';    
        const userResult = await db.query(userQuery, [data]);
        res.status(200).json({ message: "Data inserted successfully" });
    }catch{
        console.log('Nao foi possivel realizar a postagem')
        res.status(500).json({ message: "Error inserting data" });
    }
    

});

app.listen(3003, () => {
  console.log("Server started on port 3003");
});
