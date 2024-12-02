import pg from "@config/pg-pool";
import { NextFunction, Request } from "express";
import bcrypt from "bcrypt";

const signup = async (req: Request, res: any, next: NextFunction) => {
  try {
    //email verification
    const userCredentials = req.body;
    const hasPassword = await bcrypt.hash(userCredentials.password, 13);
    userCredentials.password = hasPassword;
    const queryText = `INSERT INTO "user" (user_name,email,password) VALUES ($1,$2,$3) RETURNING *`;
    const values = [
      userCredentials.user_name,
      userCredentials.email,
      userCredentials.password,
    ];
    const result = await pg.query(queryText, values);
    return res
      .status(200)
      .json(`User ${result.rows[0].user_name} added successfully`);
  } catch (error) {
    next(error);
  }
};

export default signup;
