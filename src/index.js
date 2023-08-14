import app from "./app.js"; 

app.listen(process.env.PORT || 3000, ()=>{return console.log("server is running on port " + process.env.PORT )});