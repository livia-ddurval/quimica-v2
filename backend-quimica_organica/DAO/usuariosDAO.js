const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.render('DEV/usuarios/listusuarios', { usuarios: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de adição de usuário
router.get('/add', (req, res) => {
  const filePath = path.join(__dirname, '../MVC/Views/DEV/usuarios/addusuarios.html');
  res.sendFile(filePath);
});


router.post('/add', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    await pool.query('INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', [nome, email, senha, tipo]);
    res.redirect('/usuarios');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    res.render('DEV/usuarios/upusuario', { usuario: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, tipo } = req.body;
  try {
    await pool.query('UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?', [nome, email, senha, tipo, id]);
    res.redirect('/usuarios');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para deletar um usuário
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
