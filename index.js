const express = require('express');
const app = express();
const port = 8000;
const connectDB=require('./config/mongoose');
var bodyParser = require('body-parser')


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use('/',require('./routes/index'));
app.use('/',require('./routes/index'));


const start = async() =>{
    try {
        const url = 'mongodb://localhost:27017/assignment';
        await connectDB(url);
        app.listen(port,function(){
            console.log(`Server running at port: ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
}
start();

