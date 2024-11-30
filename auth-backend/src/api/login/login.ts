//handle the logic and database
import { NextFunction, Request, Response } from "express";
import pg from "@config/pg-pool";
import bcrypt from "bcrypt";

const login = async (req: Request, res: any, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const queryText = `SELECT * FROM "user" WHERE email = $1`;
    const result = await pg.query(queryText, [email]);
    if (!result.rows[0]) {
      return res
        .status(401)
        .json("User with " + email + "is not existed in the DB");
    } else {
      const isCorrectPassword = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (isCorrectPassword) {
        return res
          .status(200)
          .json("User has granted access to the application");
      } else {
        return res.status(401).json("User password is incorrect");
      }
    }
  } catch (error) {
    next(error); //passing error to express
  }
};
export default login;
