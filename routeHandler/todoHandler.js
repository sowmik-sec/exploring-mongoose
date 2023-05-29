const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {});

// GET A THE TODOS
router.get("/:id", async (req, res) => {});
// PORT  TODOS
router.post("/", async (req, res) => {});

// POST MULTIPLE TODO
router.post("/all", async (req, res) => {});
// PUT TODO
router.put("/:id", async (req, res) => {});
// DELETE TODO
router.delete("/:id", async (req, res) => {});

module.exports = router;
