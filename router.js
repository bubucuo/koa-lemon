const Koa = require("koa");
const { query } = require("./mysql");
const { bodyParser } = require("@koa/bodyparser");

const app = new Koa();
app.use(bodyParser());

const Router = require("koa-router");
const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "Home Page";
});

router.get("/about", async (ctx) => {
  ctx.body = "About Page";
});

// ! 添加用户
router.post("/user/add", async (ctx) => {
  const { username, age, code, address, phone, password } = ctx.request.body;
  const sql = `insert into user ( username, age, code, address, phone, password) values ('${username}', '${age}', '${code}', '${address}', '${phone}', '${password}')`;
  const result = await query(sql);
  ctx.body = {
    msg: "添加成功",
  };
});

//  ! 查询用户列表和用户信息
router.get("/user/list", async (ctx) => {
  const { pageNo, pageSize } = ctx.query;
  const sql = `select * from user limit ${
    (pageNo - 1) * pageSize
  }, ${pageSize}`;

  const content = await query(sql); // 查询用户列表

  const total = await query("select count(*) from user");

  ctx.body = {
    content,
    total: total[0]["count(*)"],
  };
});

router.get("/user/findOneByName/:name", async (ctx) => {
  const { name } = ctx.params;
  const sql = `select * from user where username = '${name}'`;
  const res = await query(sql);
  ctx.body = res;
});

// ! 修改用户信息
router.post("/user/update", async (ctx) => {
  const { id, username, age, code, address, phone, password } =
    ctx.request.body;

  const sql = `update user set username = '${username}', age = '${age}', code = '${code}', address = '${address}', phone = '${phone}', password = '${password}' where id = ${id}`;
  const result = await query(sql);
  ctx.body = { id, username, age, code, address, phone, password };
});

// ! 删除用户
router.post("/user/delete/:id", async (ctx) => {
  const { id } = ctx.params;
  const sql = `delete from user where id = ${id}`;
  const result = await query(sql);
  ctx.body = { id };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {});
