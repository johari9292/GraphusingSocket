const dotenv = require("dotenv").config()
const express = require("express");
const http = require("http");
// const socketIo = require("socket.io");
const port = process.env.PORT || 8080;
const BodyParser = require("body-parser");
const index = require("./routes/index");
const app = express();

app.use(index);
const server = http.createServer(app);
// const io = socketIo(server);
var config = require("./config/db");
const Controller = require("./controllers/Controller")
const ObjectId = require("mongodb").ObjectID;
const MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = "test";
const cors = require('cors');
const uri = "mongodb+srv://joharibalti1996:is119821885@cluster0-jjj5l.mongodb.net/test?retryWrites=true&w=majority";
app.use(BodyParser.json());
app.use(BodyParser.urlencoded());

const path = require("path")
var database, collection;

app.use(cors());
app.options('*', cors());

// MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {

//   if (error) {
//     throw error;
//   }
//   database = client.db(DATABASE_NAME);
//   collection = database.collection("todos");
//   console.log("Connected to `" + DATABASE_NAME + "`!");
// //  collection.aggregate

//   io.on("connection", socket => {
//     console.log("New client connected");
//     let dates = new Date(2019,10,22).getDate();
//     let newdate = new Date().getDate(); 
//     let newmonth = new Date().getMonth() ;
//     let newyear = new Date().getFullYear();
//     var start = new Date(newyear, newmonth, newdate, 5, 58, 0, 30);
//     var end = new Date(newyear, newmonth, newdate, 22, 0, 0, 1);

//     console.log(newdate, newmonth, newyear )
//     if (!socket.sentMydata) {
//      collection.find({ date: { $gte: start, $lt: end } }).toArray(function (err, result) {
//         if (err) throw err;
       
//         let myarr = []
//         let istrue = true
//         result.map(({date,no_task}) =>{
//           if (istrue === true) {
//             myarr.push({ "x": (new Date(date).setHours(6, 0, 0)), "y": 0 })
//             istrue = false
//         }
//           myarr.push({"x":date,"y":no_task})
         
//          socket.emit("mydata", (myarr));

//         }
//           )
       

//       })
//       socket.sentMydata = true;
//     }
//     const changeStream = collection.watch()
//     changeStream.on('change', function (change) {
//       console.log("collection changed");
//       collection.find({}).sort({ _id: -1 }).limit(1).toArray(function (err, result) {
//         if (err) throw err;
       
//        let x = []
//         result.map(({date,no_task}) =>{
//            x.push({"x":date,"y":no_task})

//          }
//            )
        
//         socket.emit("FromAPI", (x));

//       })
//     })

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });
// })
app.use(express.static(path.join(__dirname, "frontend", "build")))
app
  .route('/byyear/:year')
  .get(Controller.getbyyear)
app
  .route('/getdata/:date')
  .get(Controller.gettodo)
app
  .route('/getdata/:month/:year')
  .get(Controller.getbymonth)



app
  .route('/get/:id')
  .get(Controller.gettodobyid)

 
app
  .route('/add')
  .post(Controller.addtodo)
  
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});


server.listen(port, () => console.log(`Listening on port ${port}`))
