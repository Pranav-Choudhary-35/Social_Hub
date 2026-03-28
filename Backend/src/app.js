const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const app=express();
const path = require("path");


app.use(express.json());
app.use(cookieParser());


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://your-render-url.onrender.com"
    ],
}));



app.use(express.static(path.join(__dirname, "../public")));



//require routes

const authRouter=require("./routes/authroutes")
const postRouter=require('./routes/post.routes');
const userRouter=require('./routes/user.routes')

//create routes 

app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports=app;


