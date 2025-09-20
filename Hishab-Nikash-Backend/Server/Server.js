/*import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 

// mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "hishab_nikash",
});

// to db
db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed: ", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

// testing
app.get("/", (req, res) => {
  res.send("API is running");
});

// add transaction
app.post("/add-transaction", (req, res) => {
  console.log("POST /add-transaction hit");
  console.log("Request Body:", req.body);

  const { user_id, title, type, category, amount } = req.body;

  if (!user_id || !title || !type || !category || amount === undefined) {
    console.log("Missing fields in request body!");
    return res.status(400).json({ message: "Missing fields" });
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    console.log("Invalid amount value:", amount);
    return res.status(400).json({ message: "Invalid amount" });
  }

  const sql =
    "INSERT INTO transactions (user_id, title, type, category, amount) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [user_id, title, type, category, numericAmount], (err, result) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.status(500).send("Database Error");
    }

    console.log("Transaction Added, ID:", result.insertId);
    res.status(200).json({
      message: "Transaction Added Successfully",
      transactionId: result.insertId,
    });
  });
});

//all transactions
app.get("/transactions", (req, res) => {
  console.log("GET /transactions hit");

  const sql = "SELECT * FROM transactions ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.status(500).send("Database Error");
    }

    console.log("Fetched transactions:", results.length);
    res.json(results);
  });
});

// start
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
*/