// ! 不要删除这个文件，yu-next会用，React19的课程里在用

// cjs
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  console.log("%c [  ]-7", "font-size:13px; background:pink; color:#bf2c9f;");
  // ctx.body = "Hello KOA";
  ctx.body = {
    message: "Hello Hello",
    title: "ooo Hello World sy",
  };
});

app.listen(3000);
