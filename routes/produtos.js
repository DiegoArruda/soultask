const { Router } = require("express");
const { Produto, customJoi } = require("../models/produto");
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
    const { error } = customJoi.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const {
        nome,
        descricao,
        quantidade,
        preco,
        desconto,
        dataDesconto,
        categoria,
      } = req.body;
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

//Update
router.put("/produtos/:id", async (req, res) => {
  try {
    const { error } = customJoi.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const { id } = req.params;
      const {
        nome,
        descricao,
        quantidade,
        preco,
        desconto,
        dataDesconto,
        categoria,
      } = req.body;
      const produtoAtt = await Produto.findByIdAndUpdate(id, {
        nome,
        descricao,
        quantidade,
        preco,
        desconto,
        dataDesconto,
        categoria,
      });
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
