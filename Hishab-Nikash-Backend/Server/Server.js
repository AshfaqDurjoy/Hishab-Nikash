import express from "express";  // Use import instead of require
import mysql from "mysql2";     // Use import instead of require
import cors from "cors";        // Use import instead of require

const app = express();         // Now correctly defines app
const port = 5000;

app.use(cors());
app.use(express.json()); // To parse JSON data

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hishab_nikash",
});

// To DB
db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed: ", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

// Testing route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Add transaction route
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

// Get all transactions
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

// ===== Analytics Route (added here) =====
app.get("/analytics", (req, res) => {
  const { range = "7d", user_id } = req.query;

  // Define date range based on `range`
  const now = new Date();
  let from = new Date();
  switch (range) {
    case "today":
      from.setHours(0, 0, 0, 0);
      break;
    case "3d":
      from.setDate(now.getDate() - 3);
      break;
    case "7d":
      from.setDate(now.getDate() - 7);
      break;
    case "1m":
      from.setMonth(now.getMonth() - 1);
      break;
    default:
      from.setDate(now.getDate() - 7);
  }
  const to = now;

  const where = [];
  const params = [];

  where.push("created_at BETWEEN ? AND ?");
  params.push(from.toISOString().slice(0, 19).replace("T", " "));
  params.push(to.toISOString().slice(0, 19).replace("T", " "));
  if (user_id) {
    where.push("user_id = ?");
    params.push(user_id);
  }

  const whereSql = where.length ? "WHERE " + where.join(" AND ") : "";

  const q = (type) => `
    SELECT category AS name,
           SUM(CASE WHEN amount < 0 THEN -amount ELSE amount END) AS amount
    FROM transactions
    ${whereSql} AND type = ?
    GROUP BY category
    ORDER BY amount DESC
  `;

  const creditPromise = new Promise((resolve, reject) => {
    db.query(q("credit"), [...params, "credit"], (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });

  const debitPromise = new Promise((resolve, reject) => {
    db.query(q("debit"), [...params, "debit"], (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });

  Promise.all([creditPromise, debitPromise])
    .then(([credit, debit]) => {
      const sum = (arr) => arr.reduce((s, r) => s + Number(r.amount || 0), 0);
      res.json({
        range,
        from,
        to,
        credit,
        debit,
        totals: { credit: sum(credit), debit: sum(debit) },
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Analytics error" });
    });
});


// Start server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
