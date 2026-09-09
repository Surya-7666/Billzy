const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Billzy Payment Server",
  });
});

app.listen(PORT, () => {
  console.log(`Billzy payment server running on http://localhost:${PORT}`);
});