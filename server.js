const app=require('./src/app');
require('dotenv').config();
const connectDb=require('./src/database/connectDb');


//connect to database
connectDb();



app.listen(process.env.PORT,()=>{
console.log(`server is running on localhost:${process.env.PORT}`);

});