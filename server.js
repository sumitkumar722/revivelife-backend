const express = require("express");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'https://sumitkumar722.github.io',
}));
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.send("ReviveLife Backend Running");
});

// POST appointment
app.post("/appointments", (req, res) => {
  const newAppointment = req.body;

  fs.readFile("./data/appointments.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading appointments data");

    const appointments = JSON.parse(data);
    appointments.push(newAppointment);

    fs.writeFile("./data/appointments.json", JSON.stringify(appointments, null, 2), err => {
      if (err) return res.status(500).send("Error saving appointment");
      res.status(200).send("Appointment saved successfully");
    });
  });
});

app.listen(PORT, () => {
  console.log('Server started on port ${PORT}');
});
