const { Router } = require("express");
const { Produto, createJoi, updateJoi } = require("../models/produto");
const path = require("path");

const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img/");
  },
  //cb = callback
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Create
router.post("/produtos", upload.single("imagem"), async (req, res) => {
  try {
    const {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    } = req.body;
    const { error } = createJoi.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const produto = new Produto({
        nome,
        descricao,
        quantidade,
        preco,
        desconto,
        dataDesconto,
        categoria,
        imagem: req.file.filename,
      });
      await produto.save();
      res
        .status(201)
        .json({ message: "Produto criado com sucesso", produto: produto });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Read
router.get("/produtos", async (req, res) => {
  const produtos = await Produto.find();
  res.status(200).json(produtos);
});

//Read by ID
router.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findById(id);
    const listaProdutos = await Produto.find();
    if (produto) {
      res.json(produto);
    } else
      res.status(404).json({
        message: "Produto não encontrado",
        produtos: listaProdutos,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read by NOME
router.get("/buscanome", async (req, res) => {
  try {
    let { nome } = req.query;
    const produto = await Produto.findOne({
      nome: nome,
    }).collation({ locale: "pt", strength: 1 });
    const listaProdutos = await Produto.find();
    if (produto && nome) {
      res.status(200).json(produto);
    } else
      res
        .status(404)
        .json({ message: "Produto não encontrado", produtos: listaProdutos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//READ BY CATEGORIA
router.get("/buscacategoria", async (req, res) => {
  try {
    let { categoria } = req.query;
    const produto = await Produto.findOne({ categoria: categoria }).collation({
      locale: "pt",
      strength: 1,
    });
    const listaProdutos = await Produto.find();
    if (produto && categoria) {
      res.status(200).json(produto);
    } else
      res.status(404).json({
        message:
          "Produto nesta categoria não encontrado ou categoria inexistente",
        produtos: listaProdutos,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ BY QUANTIDADE
router.get("/buscaquantidade", async (req, res) => {
  try {
    let { quantidade } = req.query;
    const produto = await Produto.findOne({ quantidade: quantidade }).exec();
    const listaProdutos = await Produto.find();
    if (produto && produto.quantidade === 0) {
      res.status(200).json({
        message: "Os seguintes produtos estão com o estoque zerado",
        produtos: produto,
      });
    } else if (produto) {
      res.status(200).json(produto);
    } else
      res.status(404).json({
        message: "Produto com esta quantidade não encontrado",
        produtos: listaProdutos,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update
router.put("/produtos/:id", upload.single("imagem"), async (req, res) => {
  try {
    const {
      nome,
      descricao,
      quantidade,
      preco,
      desconto,
      dataDesconto,
      categoria,
    } = req.body;
    console.log(req.body);
    const { error } = updateJoi.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { id } = req.params;
      const produtoAtt = await Produto.findByIdAndUpdate(
        id,
        {
          nome,
          descricao,
          quantidade,
          preco,
          desconto,
          dataDesconto,
          categoria,
          imagem: req.file?.filename,
        },
        { new: true }
      );
      const listaProdutos = await Produto.find();
      if (produtoAtt) {
        res.status(200).json({
          message: "Produto atualizado",
          produto: produtoAtt,
        });
      } else
        res.status(404).json({
          message: "Produto não encontrado",
          produtos: listaProdutos,
        });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete
router.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByIdAndDelete(id);
    const listaProdutos = await Produto.find();
    if (produto) {
      res.status(200).json({ message: "Produto deletado" });
    } else
      res.status(404).json({
        message: "Produto não encontrado",
        produtos: listaProdutos,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
