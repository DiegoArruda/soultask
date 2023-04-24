const { model, Schema } = require("mongoose");
const Joi = require("joi");
const Produto = model(
  "produto",
  new Schema = Joi.object({
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().positive().integer().required(),
    preco: Joi.number().float().positive().required(),
    desconto: Joi.number().float().positive(),
    dataDesconto: Joi.date().min(now),
    categoria: Joi.string().required(),
    
  
    /* Qual o tipo da imagem? Deveria colocar atr imagem? */
  })
);

/* nome, descrição, quantidade, preço, desconto, dataDesconto, categoria, imagem do produto */
module.exports = Produto