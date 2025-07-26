const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 📁 Path to data file
const DATA_FOLDER = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_FOLDER, "appointments.json");

// 🛠 Ensure data folder and file exist
if (!fs.existsSync(DATA_FOLDER)) {
  fs.mkdirSync(DATA_FOLDER);
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// ✅ POST: Save new appointment (append to file)
app.post("/appointments", (req, res) => {
  const newAppointment = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    let appointments = [];

    if (!err && data) {
      try {
        appointments = JSON.parse(data);
      } catch (e) {
        console.error("JSON parse error:", e);
        return res.status(500).send("Corrupted data file");
      }
    }

    appointments.push(newAppointment);

    fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2), (err) => {
      if (err) {
        console.error("Write error:", err);
        return res.status(500).send("Error saving appointment");
      }

      res.status(200).send("Appointment saved successfully");
    });
  });
});

// ✅ GET: Fetch all appointments
app.get("/appointments", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error loading appointments");

    try {
      const appointments = JSON.parse(data);
      res.json(appointments);
    } catch (e) {
      console.error("JSON error:", e);
      res.status(500).send("Invalid data format");
    }
  });
});

// ✅ Admin Login
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  if (username === "Seth_sumitsoni" && password === "@31January") {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
