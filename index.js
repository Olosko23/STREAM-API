const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Channels = require("./models/channels");
const dotenv = require("dotenv").config();

const app = express();
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//////
mongoose
  .connect(URL)
  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((error) => {
    console.log({ message: error.message });
  });
//////

app.get("/", (req, res) => {
    try {
        res.status(200).json("Welcome to the API");
    } catch (error) {
        console.log({message: error.message});
        res.status(400).json({message: error.message});
    }
});

app.get("/channels", async (req, res) => {
  try {
    const channels = await Channels.find({});
    res.status(200).json(channels);
  } catch (error) {
    console.log({ message: error.message });
    res.status(400).json({message: error.message})
  }
});

app.get("/channels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channels.findById(id);
    res.status(200).json(channel);
  } catch (error) {
    console.log({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

app.post("/channels", async (req, res) => {
  try {
    const channel = await Channels.create(req.body);
    res.status(201).json(channel);
  } catch (error) {
    console.log({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});


app.patch("/channels/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const channel = await Channels.findByIdAndUpdate(id,req.body);
    res.status(201).json(channel);
  } catch (error) {
    console.log({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});


app.delete("/channels/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const channel = await Channels.findByIdAndDelete(id);
    res.status(201).json(channel);
  } catch (error) {
    console.log({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}...`);
});
