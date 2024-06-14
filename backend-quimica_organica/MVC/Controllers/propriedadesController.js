const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path');

// GET all propriedades
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM propriedades');
    res.render('DEV/propriedades/listpropriedades', { propriedades: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de adição de propriedade
router.get('/add', (req, res) => {
  res.render('DEV/propriedades/addpropriedades');
});

// POST add propriedade
router.post('/add', async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    await pool.query('INSERT INTO propriedades (nome, descricao) VALUES (?, ?)', [nome, descricao]);
    res.redirect('/propriedades');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET update propriedade form
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM propriedades WHERE id = ?', [id]);
    res.render('DEV/propriedades/uppropriedades', { propriedade: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST update propriedade
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  try {
    await pool.query('UPDATE propriedades SET nome = ?, descricao = ? WHERE id = ?', [nome, descricao, id]);
    res.redirect('/propriedades');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET delete propriedade
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM propriedades WHERE id = ?', [id]);
    res.redirect('/propriedades');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
