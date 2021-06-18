const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(cors())

const todos = [];

app.get("/todos", (req, res)=>{ 
  res.json({
    todos
  });
})

app.post("/add-todo", (req, res)=>{
  todos.push(req.body.data);
  res.json({
    status: 'OK',
    data: req.body.data
  })
})

app.listen(5000, ()=> console.log('App listening on port 5000'))