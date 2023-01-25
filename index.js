import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3030
const CREDENTIAL = JSON.parse(process.env.CREDENTIAL);
const mysql_table = "mock_data"

const db = mysql.createConnection(CREDENTIAL);

// Check
db.connect((err) => {
    if(err) {
        // console.error(err);
        process.exit(1);
    }
    console.log("MySQL connected!")
});

// GET
app.get("/", (req, res) => {
    console.log("MySQL: I am root!")
    res.send("MySQL: I am root!")
})

// GET ALL
app.get("/gettable", (req, res) => {
    const query = "SELECT * FROM mock_data ORDER BY id DESC LIMIT 10";
    db.query(query, (err, result) => {
        if(err) {process.exit(1);}

        console.table(result);
        res.send("Query Sent!")
    });
});

// GET BY ID
app.get("/class/:id", (req, res) => {
    const parameter = Number(req.params.id);
    const query = `SELECT * FROM ${mysql_table} WHERE id=?`
    db.query(query, [parameter], (err, result) => {
        if(err) {process.exit(1)};

        console.table(result);
        res.send("Qeuery sent!")
    });
});

// POST
app.post("/post", (req, res) => {
    // const parameter = {id: null, first_name: "Joe", last_name: "Person", email: "helloooooo@gmail.com", gender: "male", ip_address: "ipaddress"};
    const parameter = req.body;
    const query = `INSERT INTO ${mysql_table} SET ?`

    db.query(query, parameter, (err, result) => {
        if(err) {process.exit(1)};

        console.log(result);
        res.send("Post added!")
    });
});

// DELETE by req params id


app.listen(PORT, () => {
    console.log(`listening on http://localhost${PORT}`)
})