const express = require('express');
const router = express.Router();
const usuariosModel = require('../MVC/Models/usuariosModel');

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuariosModel.getAllUsuarios();
    res.render('DEV/usuarios/listusuario', { usuarios });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de adição de usuário
router.get('/add', (req, res) => {
  res.render('DEV/usuarios/addusuario');
});

// Rota para processar o formulário de adição de usuário
router.post('/add', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    await usuariosModel.addUsuario(nome, email, senha, tipo);
    res.redirect('/usuarios');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de atualização de usuário
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuariosModel.getUsuarioById(id);
    res.render('DEV/usuarios/upusuario', { usuario });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para processar o formulário de atualização de usuário
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo } = req.body;
  try {
    await usuariosModel.updateUsuario(id, nome, email, senha, tipo);
    res.redirect('/usuarios');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para deletar um usuário
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await usuariosModel.deleteUsuario(id);
    res.redirect('/usuarios');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
