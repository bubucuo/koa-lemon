const Koa = require("koa");
const { query } = require("./mysql");
const { bodyParser } = require("koa-bodyparser"); // 协议解析 https://www.npmjs.com/package/koa-bodyparser

const app = new Koa();

const Router = require("koa-router");
const { usersFromData, userFromData } = require("./data");
const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Home Page";
});

router.get("/about", async (ctx) => {
  ctx.body = "About Page";
});

//  todo 查询用户列表和用户信息
router.get("/user/list", async (ctx) => {});

// todo
router.get("/user/findOneByName/:name", async (ctx) => {});

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
