const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect("mongodb://0.0.0.0:27017/testdb")
  .then(() => console.log("Success"))
  .catch((error) => console.log(error));

app.get("/", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.get("/todo/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  return res.send(todo);
});

app.post("/todos/new", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.json(todo);
  } catch (error) {
    res.send(error);
  }
});

app.get("/todos/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.completed = !todo.completed;
      await todo.save();
      res.send("Todo Changed");
    }
  } catch (error) {
    res.send(error);
  }
});
app.delete("/todos/delete/:id", async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findByIdAndDelete(id);
  res.send(todo);
});

app.put("/todos/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const todo = await Todo.updateOne(
      { _id: id },
      { $set: { timestamp: Date.now(), text: data.todo } }
    );
    await todo.save();
    return res.status(200).json("Updated Todo Successfully");
  } catch (error) {
    return res.send(error);
  }
});
app.listen(4000, () => {
  console.log("Port is listening at 4000");
});
