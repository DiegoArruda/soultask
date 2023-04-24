const { Router } = require("express");
const Tarefa = require("../models/tarefa");

const router = Router();

//Create
router.post("/tarefas", async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;
    const tarefa = new Tarefa({ titulo, descricao, status });
    await tarefa.save();
    res.status(201).json(tarefa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
//Read
router.get("/tarefas", async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});

//Read ID
router.get("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const tarefa = await Tarefa.findById(id);
    if (tarefa) {
      res.status.json(tarefa);
    } else
      res
        .status(404)
        .json({ message: "Tarefa não encontrada", tarefas: Tarefa.find() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//Update
router.put("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
    const tarefaExistente = await Tarefa.findByIdAndUpdate(id, {
      titulo,
      descricao,
      status,
    });
    if (tarefaExistente) {
      res
        .status(200)
        .json({ message: "Tarefa atualizada", tarefa: tarefaExistente });
    } else
      res
        .status(404)
        .json({ message: "Tarefa não encontrada", tarefas: Tarefa.find() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Delete
router.delete("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tarefaExistente = await Tarefa.findByIdAndDelete(id);
    if (tarefaExistente) {
      res.status(200).json({ message: "Tarefa excluida" });
    } else
      res.status(404).json({
        message: "Tarefa não encontrada",
        tarefas: await Tarefa.find(),
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
