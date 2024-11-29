import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { additionService } from "@services/additionService";
import cors from "cors"; // Import the cors package
import apiRouter from "@api/api.routes";

const app: Express = express();
const port = process.env.PORT;

//origin --> combination of protocol (http,https) , domain (.com) and port (3000,5000)
app.use(
  cors({
    origin: "http://localhost:3000", // development origin
    methods: ["GET", "POST"], // Allowed HTTP methods
  })
);
app.use(express.urlencoded({ extended: true })); // can access the encoded form data in object format with req.body
app.use(express.json()); // parse the requested json data into an actual data type

app.use("/api", apiRouter); //parent route of all routes

app.listen(port, () => {
  console.log(`Authentication app listening on port ${port}`);
});
