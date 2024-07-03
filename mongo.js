const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");

const router = new Router();

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

router.get("/users", async (ctx) => {
  const users = await User.find();
  // const users = await User.findOneBy({ name: "abc" });
  ctx.body = users;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
