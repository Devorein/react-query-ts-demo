const express = require("express");

const app = express();

app.use(express.json())

const langs = [];

app.get("/langs", (req, res)=>{ 
  res.json({
    langs
  });
})

app.post("/add-lang", (req, res)=>{
  langs.push(req.body.lang);
  res.json({
    status: 'OK'
  })
})

app.listen(5000, ()=> console.log('App listening on port 5000'))