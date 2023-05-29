const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://sowmiksec:h9oy9z6pCdPriUuU@cluster0.pihjs4z.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server is listening at port 5000");
});
