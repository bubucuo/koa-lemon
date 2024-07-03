const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  // ctx.body = "Hello KOA";
  ctx.body = {
    message: "Hello Hello",
  };
});

app.listen(3000);
