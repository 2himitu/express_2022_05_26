import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "a9",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings:true,
});

const app = express();
app.use(express.json());

const post = 3000;

app.use(cors());

app.get(`/wise-sayings/random`,async(req,res)=>{
  const[[wiseSayingsRows]] = await pool.query(
    `SELECT *
    FROM wise_saying
    ORDER BY rand()
    LIMIT 1`
  );
  if (wiseSayingsRows === undefined){
    res.status(404).json({
      resultCode : "F-1",
      msg:"404 not found ",
    });
    return res;
  }
  res.json({
    resultCode:"S-1",
    msg:"성공",
    data : wiseSayingsRows,
  });
});

app.listen(post);