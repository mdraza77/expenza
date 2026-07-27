const app = require("./src/app");
const dotenv = require("dotenv").config();
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
