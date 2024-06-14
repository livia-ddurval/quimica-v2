const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path');
const multer = require('multer');

// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/grupos_funcionais');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET all grupos funcionais
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM grupos_funcionais');
    res.render('DEV/grupos_funcionais/listgruposfuncionais', { gruposFuncionais: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota para exibir o formulário de adição de grupo funcional (renderizando o arquivo HTML diretamente)
router.get('/cadastrar', (req, res) => {
    const filePath = path.join(__dirname, '..', 'MVC', 'Views', 'DEV', 'grupos_funcionais', 'addgrupos_funcionais.html');
    console.log(`File path: ${filePath}`); // Adicione este log para depuração
    res.sendFile(filePath);
  });
  

// POST add grupo funcional
router.post('/add', upload.fields([{ name: 'foto1', maxCount: 1 }, { name: 'foto2', maxCount: 1 }]), async (req, res) => {
  const { nome, descricao } = req.body;
  const foto1 = req.files['foto1'] ? req.files['foto1'][0].filename : null;
  const foto2 = req.files['foto2'] ? req.files['foto2'][0].filename : null;

  try {
    await pool.query('INSERT INTO grupos_funcionais (nome, descricao, foto1, foto2) VALUES (?, ?, ?, ?)', [nome, descricao, foto1, foto2]);
    res.redirect('/grupos_funcionais');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET update grupo funcional form
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM grupos_funcionais WHERE id = ?', [id]);
    res.render('DEV/grupos_funcionais/upgrupos_funcionais', { grupoFuncional: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST update grupo funcional
router.post('/update/:id', upload.fields([{ name: 'foto1', maxCount: 1 }, { name: 'foto2', maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  const foto1 = req.files['foto1'] ? req.files['foto1'][0].filename : null;
  const foto2 = req.files['foto2'] ? req.files['foto2'][0].filename : null;

  try {
    await pool.query('UPDATE grupos_funcionais SET nome = ?, descricao = ?, foto1 = ?, foto2 = ? WHERE id = ?', [nome, descricao, foto1, foto2, id]);
    res.redirect('/grupos_funcionais');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET delete grupo funcional
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM grupos_funcionais WHERE id = ?', [id]);
    res.redirect('/grupos_funcionais');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
