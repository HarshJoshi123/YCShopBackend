const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const morgan=require("morgan");
const { UserRoutes,ProductRoutes,CartRoutes,OrderRoutes } = require("./routes");
dotenv.config();
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGO_URI;

mongoose.connect(URI,{useNewUrlParser: true,useUnifiedTopology:true});
const connection=mongoose.connection;

connection.once('open',()=>{
	console.log("Mongo connection running");
})
mongoose.connection.on("error", (err) => {
        console.log("MongoDB connection error. Please make sure MongoDb is running.", err);
        process.exit();
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(morgan("dev")); 

app.use('/',UserRoutes);
app.use('/',ProductRoutes);
app.use('/',CartRoutes);
app.use('/',OrderRoutes);

app.listen(PORT,()=>{
    console.log('Listening at PORT :',PORT);
})