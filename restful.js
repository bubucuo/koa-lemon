const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const userRouter = new Router();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/template-server");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: "String",
    phoneNumber: "String",
    password: "String",
    salt: "String",
  })
);

userRouter.get("/", async (ctx) => {
  ctx.body = await User.find();
});

userRouter.post("/", async (ctx) => {
  const user = new User(ctx.request.body);
  await user.save();
  ctx.status = 201;
  ctx.body = user;
});

app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
