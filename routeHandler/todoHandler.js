const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {
  try {
    const result = await Todo.find({ status: "active" })
      .select({
        _id: 0,
        __v: 0,
        date: 0,
      })
      .limit(1);
    res.json({
      todos: result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

// GET ACTIVE TODOS
router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data,
  });
});

// GET
router.get("/js", async (req, res) => {
  const data = await Todo.findByJS();
  res.status(200).json({
    data,
  });
});
// GET TODOS BY TRIP
router.get("/trip", async (req, res) => {
  const data = await Todo.find().byTrip("trip");
  res.status(200).json({
    data,
  });
});

// GET A THE TODOS
router.get("/:id", async (req, res) => {
  try {
    const result = await Todo.find({ _id: req.params.id }).select({
      _id: 0,
      __v: 0,
      date: 0,
    });
    res.json({
      todos: result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});
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
    await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      {
        useFindAndModify: false,
        new: true,
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
router.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    res.json({
      todos: "Data deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
