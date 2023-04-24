const { model, Schema } = require("mongoose");
const Produto = model(
  "produto",
  new Schema({
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    desconto: {
      type: Number,
    },
    dataDesconto: {
      type: String,
    },
    categoria: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
  })
);
module.exports = Produto;
/* nome, descrição, quantidade, preço, desconto, dataDesconto, categoria, imagem do produto */
