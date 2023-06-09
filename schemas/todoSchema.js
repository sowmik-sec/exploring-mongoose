const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

// instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
};

// static methods
todoSchema.statics = {
  findByJS: function () {
    return this.find({ title: /trip/i });
  },
};

// query helpers
todoSchema.query = {
  byTrip: function (trip) {
    return this.find({ title: new RegExp(trip, "i") });
  },
};

module.exports = todoSchema;
