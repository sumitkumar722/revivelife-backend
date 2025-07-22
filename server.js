const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data/appointments.json";

app.post("/appointments", (req, res) => {
  const newAppointment = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    const appointments = data ? JSON.parse(data) : [];
    appointments.push(newAppointment);

    fs.writeFile(DATA_FILE, JSON.stringify(appointments, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving data.");
      res.status(200).send("Appointment saved.");
    });
  });
});

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});