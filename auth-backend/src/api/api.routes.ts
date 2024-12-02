import express from "express";
import login from "./login";
import signup from "./sign-up";
import sendMail from "@utils/sendMail";
import { NextFunction, Request } from "express";

const apiRouter = express.Router({
  //but not necessarily for my use case
  mergeParams: true, //use for mergin params from the parent router
});

const temporaryVerificationCodeStorage = {
  email: "",
  verificationCode: "",
};

apiRouter.route("/login").post(login).get();
apiRouter.post(
  `/send-email-verification`,
  async (req: Request, res: any, next: NextFunction) => {
    try {
      const { email } = req.query;
      //generate 4 digits random number
      const toVerifyCode: string = `${Math.floor(
        Math.random() * 10000
      )}`.padStart(4, "0");
      temporaryVerificationCodeStorage["email"] = email as string;
      temporaryVerificationCodeStorage["verificationCode"] = toVerifyCode;
      sendMail({
        from: "Kvin's App <kevinqt4you@gmail.com>",
        to: email,
        subject: "Email Verification Code For KVin's App",
        text: `Your's Verification Code: ${toVerifyCode}`,
        html: `<h1>Your's Verification Code: ${toVerifyCode}</h1>`,
      })
        .then((info) => {
          console.log("info after sending email", info);
          return res
            .status(200)
            .json({ message: "Verification Code sent to your email" });
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
  }
);
apiRouter.post(
  "/sign-up",
  async (req: Request, res: any, next: NextFunction) => {
    try {
      //code verification middleware
      const { email, toVerifyCode } = req.body;
      if (
        email === temporaryVerificationCodeStorage.email &&
        toVerifyCode === temporaryVerificationCodeStorage.verificationCode
      ) {
        next();
      } else {
        return res.status(404).json({ message: "Incorrect verification code" });
      }
    } catch (error) {
      next(error);
    }
  },
  signup
);

export default apiRouter;
