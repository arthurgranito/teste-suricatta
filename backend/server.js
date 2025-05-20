const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const Task = require("./task");

const uri = process.env.MONGODB_URI || "mongodb://localhost://27017/todoapp";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.error("Erro ao conectar no mongoDB", error));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { task, description } = req.body;
    if (!task) return res.status(400).json({ erro: "Título é obrigatório" });

    const newTask = new Task({ task, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const filter = {};
    if (req.query.checked !== undefined) {
      filter.checked = req.query.checked === "true";
    }
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ erro: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.put("/api/tasks/:id", upload.single("proofFile"), async (req, res) => {
  try {
    const { task, description, checked } = req.body;
    const arquivo = req.file;

    const updateData = { task, description, checked };

    if (arquivo) {
      updateData.proofFile = arquivo.buffer;
      updateData.proofFileType = arquivo.mimetype;
      updateData.proofFileName = arquivo.originalname;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ erro: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get("/api/tasks/:id/proof", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || !task.proofFile) {
      return res.status(404).json({ erro: "Arquivo não encontrado" });
    }

    res.set({
      "Content-Type": task.proofFileType,
      "Content-Disposition": `attachment; filename="${task.proofFileName}`,
    });

    res.send(task.proofFile); 
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ erro: "Task not found" });
    res.json({ mensagem: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = app;

if (require.main === module) {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todoapp";
  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB conectado");
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Erro ao conectar no mongoDB", error);
    });
}
