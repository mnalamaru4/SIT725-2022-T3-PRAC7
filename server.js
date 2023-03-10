var express = require("express");
var app = express();
var cors = require("cors");
let projectCollection;
let dbconnect = require("./routes/projectRoutes");
let projectRoutes = require("./routes/projectRoutes");

let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/projects", projectRoutes);

// let io = require('socket.io')(http);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

//mongodb connection
// const MongoClient = require('mongodb').MongoClient;
// const uri = 'mongodb+srv://Mahidhar:<9989>@cluster0.iu84sbl.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {useNewUrlParser: true})

// const createCollection = (collectionName) => {
//         client.connect((err,db) => {
//                 projectCollection = client.db().collection(collectionName);
//                 if(!err){
//                         console.log('MongoDb Connected')
//                 }
//                 else{
//                   console.log("DB Error: ", err);
//                   process.exit(1);
//                 }

//         })
// }

// insert project
// const insertProjects = (project,callback) => {
//         projectCollection.insert(project,callback);

// }

// // post api
// app.post('/api/projects'(req,res) => {
//         console.log("New Project added", req.body)
//         var newProject = req.body
//         insertProjects(newProject,(err,result) => {
//                 if(err) {
//                         res.json({status code: 400, message: err})
//                 }
//                 else {
//                         res.json({statusCode:200, message:"Project Scuccessfully added", data: result})
//                 }
//         })
// })

// // const cardList = [
// //     {
// //         title: "DANE",
// //         image: "images/dane.jpg",
// //         link: "About DANE",
// //         desciption: "Demo desciption about kitten 2"
// //     },
// //     {
// //         title: "GREAT DANE",
// //         image: "images/GREAT DANE.jpg",
// //         link: "About GREAT DANE",
// //         desciption: "Demo desciption about GREAT DANE"
// //     }
// // ]

// // get project
// const getProjects = (callback) => {
//         projectCollection.find({}).toArray(callback);
// }

// app.get('/api/projects',(req,res) => {
//         getProjects((err,result) =>{
//                 if(err) {
//                         res.json({statusCode: 400, message: err})
//                 }
//                 else{
//                         res.json({sttausCode:200, message:"Success", data: result})
//                 }
//         })
// })

// var port = process.env.port || 3000;

// app.listen(port,()=>{
//     console.log("App listening to: "+port)
// })
var port = process.env.port || 3000;
http.listen(port, () => {
  console.log("App listening to http://localhost:" + port);
  // createCollection('Pets')
});
