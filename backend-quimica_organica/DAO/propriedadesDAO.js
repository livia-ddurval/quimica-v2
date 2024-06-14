const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path')

// GET all propriedades
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM propriedades');
    res.render('DEV/propriedades/listpropriedades', { propriedades: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET add propriedade form
router.get('/add', (req, res) => {
  const filePath = path.join(__dirname, '../MVC/Views/DEV/propriedades/addpropriedades.html');
  res.sendFile(filePath);
});

// POST add propriedade
router.post('/add', async (req, res) => {
  const { composto_id, propriedade_nome, propriedade_valor } = req.body;
  try {
    await pool.query('INSERT INTO propriedades (composto_id, propriedade_nome, propriedade_valor) VALUES (?, ?, ?)', [composto_id, propriedade_nome, propriedade_valor]);
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
    const [compostos] = await pool.query('SELECT * FROM compostos');
    res.render('DEV/propriedades/uppropriedades', { propriedade: rows[0], compostos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST update propriedade
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { composto_id, propriedade_nome, propriedade_valor } = req.body;
  try {
    await pool.query('UPDATE propriedades SET composto_id = ?, propriedade_nome = ?, propriedade_valor = ? WHERE id = ?', [composto_id, propriedade_nome, propriedade_valor, id]);
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
