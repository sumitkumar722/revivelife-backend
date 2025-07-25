const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "appointments.json");

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

// Ensure appointments.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// 🔹 POST: Save new appointment
app.post("/appointments", (req, res) => {
  const newAppointment = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).send("Server error");

    const appointments = JSON.parse(data);
    appointments.push(newAppointment);

    fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2), err => {
      if (err) return res.status(500).send("Error saving appointment");
      res.status(200).send("Appointment saved successfully");
    });
  });
});

// 🔹 GET: Fetch all appointments
app.get("/appointments", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error loading appointments");
    res.json(JSON.parse(data));
  });
});

// 🔹 Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  if (username === "Seth_sumitsoni" && password === "@31January") {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});
