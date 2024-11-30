import pg from "@config/pg-pool";
import { NextFunction, Request } from "express";
const signup = async (req: Request, res: any, next: NextFunction) => {
  try {
    const userCredentials = req.body;
    const queryText = `INSERT INTO "user" (user_name,email,password) VALUES ($1,$2,$3) RETURNING *`;
    const values = [
      userCredentials.username,
      userCredentials.email,
      userCredentials.password,
    ];
    const result = await pg.query(queryText, values);
    console.log("Added Data", result.rows);
    return res.status(200).json("User data added successfully");
  } catch (error) {
    next(error);
  }
};

export default signup;
