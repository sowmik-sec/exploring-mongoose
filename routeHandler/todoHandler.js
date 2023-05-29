const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {});

// GET A THE TODOS
router.get("/:id", async (req, res) => {});
// PORT A TODOS
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos were inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
});
// PUT TODO
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      }
    );
    res.status(200).json({
      message: "Todo updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
});
// DELETE TODO
router.delete("/:id", async (req, res) => {});

module.exports = router;
