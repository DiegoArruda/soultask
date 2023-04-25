//Requires
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

//Config do express
const app = express();
app.use(express.json());

//Config do db'
mongoose.connect(process.env.MONGODB_URL);

const rotaTarefas = require("./routes/tarefas");
const rotaProdutos = require("./routes/produtos");
app.use(rotaTarefas);
app.use(rotaProdutos);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocs));

//Listen
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
