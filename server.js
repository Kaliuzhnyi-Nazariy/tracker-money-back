const { default: mongoose } = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3003))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
