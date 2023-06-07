const express = require('express');
const bodyParser = require('body-parser');
const connect = require("./src/config/db");
const user = require("./src/controllers/user.controller")
const PORT = process.env.PORT || 5500;
var cors = require('cors');
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use("/user",user)


app.get('', async (req,res) => {
    await res.send('hii there')
 })


// Start the server
app.listen( PORT,async ()=>{

    try{
        await connect();
    }catch(err){
        console.log(err)
    }
    console.log('server is running')
})