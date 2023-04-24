const { model, Schema } = require("mongoose");

//Titulo, descricao, status(finalizada/pendente)
const Tarefa = model(
  "tarefa",
  new Schema({
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
      maxlength: 100,
    },
    status: {
      type: String,
      default: "pendente",
    },
  })
);

module.exports = Tarefa;
