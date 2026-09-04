require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const debugRequest = require('./middleware/debugRequest');
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors())
app.use(express.json());
app.use(debugRequest);
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.json({ service: 'spoonful-api', health: '/api/health' });
});

app.get('/api/health', (req, res) => {
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.status(db.readyState === 1 ? 200 : 503).json({
    service: 'spoonful-api',
    database: states[db.readyState] || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/users", require("./routes/users"));
app.use("/api/recipes", require("./routes/recipes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
