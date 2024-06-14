const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../db');

// Rota para listar todos os usos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usos');
    res.render('DEV/usos/listusos', { usos: rows });
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
  const { composto_id, uso_descricao } = req.body;
  try {
    await pool.query('INSERT INTO usos (composto_id, uso_descricao) VALUES (?, ?)', [composto_id, uso_descricao]);
    res.redirect('/usos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de atualização de uso
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM usos WHERE id = ?', [id]);
    const [compostos] = await pool.query('SELECT * FROM compostos');
    res.render('DEV/usos/upusos', { uso: rows[0], compostos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para processar o formulário de atualização de uso
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { composto_id, uso_descricao } = req.body;
  try {
    await pool.query('UPDATE usos SET composto_id = ?, uso_descricao = ? WHERE id = ?', [composto_id, uso_descricao, id]);
    res.redirect('/usos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para deletar um uso
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usos WHERE id = ?', [id]);
    res.redirect('/usos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
  