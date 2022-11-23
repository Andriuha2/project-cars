const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("hittt");

  res.status(200).json({ works: "yes" });
});

app.post("/insertCar", async (req, res) => {
  try {
    const car = await db.query(`INSERT INTO public.Cars(
      id, title, image, price, numberplate)
      VALUES (${req.body.id}, '${req.body.title}', '${req.body.image}', ${req.body.price}, '${req.body.numberplate}')`);
    return res.status(200).json({ status: "Car inserted" });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ status: "All Good" });
});

app.get("/getAllCars", async (req, res) => {
  try {
    const car = await db.query("SELECT * FROM Cars");
    console.log(car.rows);

    res.status(200).json({ car: car.rows });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deleteCarById/:id", async (req, res) => {
  try {
    await db.query(`DELETE FROM Cars WHERE id='${req.params.id}'`);

    return res.status(200).json({ status: "car deleted!" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getCarById/:id", async (req, res) => {
  try {
    const car = await db.query(
      `SELECT * FROM cars WHERE id='${req.params.id}'`
    );
    console.log(car.rows);

    res.status(200).json({ car: car.rows });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Listed on port 3000");
});
