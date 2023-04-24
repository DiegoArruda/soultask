const { Router } = require("express");
const Produto = require("../models/produto");
const path = require("path");

const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img/");
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
