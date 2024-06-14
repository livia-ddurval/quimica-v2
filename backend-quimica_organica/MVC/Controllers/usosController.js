const express = require('express');
const router = express.Router();
const usosModel = require('../MVC/Models/usosModel');

// Rota para listar todos os usos
router.get('/', async (req, res) => {
  try {
    const usos = await usosModel.getAllUsos();
    res.render('DEV/usos/listusos', { usos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de adição de uso
router.get('/cadastrar', (req, res) => {
  const filePath = path.join(__dirname, '../MVC/Views/DEV/usos/addusos.html');
  res.sendFile(filePath);
});

// Rota para processar o formulário de adição de uso
router.post('/add', async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    await usosModel.addUso(nome, descricao);
    res.redirect('/usos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de atualização de uso
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const uso = await usosModel.getUsoById(id);
    res.render('DEV/usos/upusos', { uso });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para processar o formulário de atualização de uso
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    await usosModel.updateUso(id, nome, descricao);
    res.redirect('/usos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para deletar um uso
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await usosModel.deleteUso(id);
    res.redirect('/usos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
