import express from "express";
import login from "./login";
import signup from "./sign-up";

const apiRouter = express.Router({
  //but not necessarily for my use case
  mergeParams: true, //use for mergin params from the parent router
});

apiRouter.route("/login").post(login).get();
apiRouter.post("/sign-up", signup);
export default apiRouter;
