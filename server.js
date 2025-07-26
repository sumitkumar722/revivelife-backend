const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//  MongoDB Connection
mongoose.connect("mongodb+srv://mrsumitkumar722:cLhI7ah9p9DchYqg@cluster0.zoc1n9k.mongodb.net/appointmentsDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB Connected"))
.catch((err) => console.error(" MongoDB Connection Error:", err));

//  Appointment Schema & Model
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  message: String
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

//  POST: Save appointment to MongoDB
app.post("/appointments", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(200).send(" Appointment saved to MongoDB");
  } catch (err) {
    console.error(" MongoDB Save Error:", err);
    res.status(500).send(" Failed to save appointment");
  }
});

//  GET: Fetch appointments from MongoDB
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(" MongoDB Fetch Error:", err);
    res.status(500).send(" Failed to fetch appointments");
  }
});

// Admin Login
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  if (username === "Seth_sumitsoni" && password === "@31January") {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// tart Server
app.listen(PORT, () => {
  console.log( `Server running at http://localhost:${PORT}`);
});
