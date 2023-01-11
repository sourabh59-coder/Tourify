// import express from "express";
// const port = 5000;

// const app = express();

// app.get("/",(req,res) => {
//     res.send("Hello Express");
// });

// // mongodb+srv://codelikeme:<password>@cluster0.pzq9zep.mongodb.net/?retryWrites=true&w=majority

// // LX2N2umJVPsZWcJr

// app.listen(port, () => {
//     console.log(`server running on port ${port}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/user/signup

app.use("/tour", tourRouter);

const MONGODB_URL = 
"mongodb+srv://sourabhchandel59:u5y9cpwrday2IZ1A@cluster0.cr499ok.mongodb.net/tour_db?retryWrites=true&w=majority";

const port = 8000;

//greAT12122000
// mongodb+srv://codelikeme:<password>@cluster0.0lrgm2z.mongodb.net/?retryWrites=true&w=majority

// app.get("/",(req,res) => {
//     res.send("Hello Express");
// })


// sourabhchandel59
// u5y9cpwrday2IZ1A

// app.listen(port,() => {
//     console.log(`server running on port ${port}`);
// });

// var db = "mongodb://localhost:27017/example";

// mongoose.;`

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));


  