import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { additionService } from "@services/additionService";
const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  const result = additionService(2, 5);
  res.send(`Two plus three is ${result}`);
});

app.listen(port, () => {
  console.log(`Authentication app listening on port ${port}`);
});
