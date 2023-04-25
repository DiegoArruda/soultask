const Joi = require("joi");
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

const createJoi = Joi.object({
  nome: Joi.string().required().messages({
    message: "Formato incorreto",
  }),
  descricao: Joi.string().required().messages({
    message: "Formato incorreto",
  }),
  quantidade: Joi.number().integer().min(0).required().messages({
    message: "Formato incorreto",
  }),
  preco: Joi.number().required().positive().messages({
    message: "Formato incorreto",
  }),
  desconto: Joi.number().positive(),
  dataDesconto: Joi.date().min("now"),
  categoria: Joi.string().messages({
    message: "Formato incorreto",
  }),
  imagem: Joi.string(),
});

const updateJoi = Joi.object({
  nome: Joi.string().messages({
    message: "Formato incorreto",
  }),
  descricao: Joi.string().messages({
    message: "Formato incorreto",
  }),
  quantidade: Joi.number().integer().min(0).messages({
    message: "Formato incorreto",
  }),
  preco: Joi.number().messages({
    message: "Formato incorreto",
  }),
  desconto: Joi.number().positive(),
  dataDesconto: Joi.date().min("now"),
  categoria: Joi.string().messages({
    message: "Formato incorreto",
  }),
  imagem: Joi.string(),
});

module.exports = { createJoi, updateJoi, Produto };
/* nome, descrição, quantidade, preço, desconto, dataDesconto, categoria, imagem do produto */

//usar binary(não usar schema em post e put )
