const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../db');
const { format } = require('date-fns');
const multer = require('multer');

// Configuração do multer para o armazenamento de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../MVC/Views/Public/images/uploads')); // Caminho para a pasta de uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Gera um nome único para o arquivo
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Usa o nome único + extensão original
  }
});

// Configuração completa do Multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Implemente seu filtro de arquivo se necessário
    cb(null, true); // Aceita todos os arquivos por padrão
  },
  limits: {
    // Define limites se necessário
  },
  // Campos esperados no formulário
  fields: [
    { name: 'foto1', maxCount: 1 },
    { name: 'foto2', maxCount: 1 }
  ]
});

// GET all compostos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM compostos');
    const compostos = rows.map(composto => ({
      id: composto.id,
      nome: composto.nome,
      formula_molecular: composto.formula_molecular,
      estrutura_molecular: composto.estrutura_molecular,
      grupo_funcional_id: composto.grupo_funcional_id,
      criado_por: composto.criado_por,
      criadoEm: format(new Date(composto.criado_em), 'dd/MM/yyyy HH:mm:ss'),
      foto1: composto.foto1,
      foto2: composto.foto2
    }));
    res.render('DEV/compostos/listcompostos', { compostos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET add composto form
router.get('/add', (req, res) => {
  const filePath = path.join(__dirname, '../MVC/Views/DEV/compostos/addcompostos.html');
  res.sendFile(filePath);
});

// POST add composto
router.post('/add', upload.fields([{ name: 'foto1' }, { name: 'foto2' }]), async (req, res) => {
  const { nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por } = req.body;
  const foto1 = req.files && req.files['foto1'] ? req.files['foto1'][0].filename : null;
  const foto2 = req.files && req.files['foto2'] ? req.files['foto2'][0].filename : null;
  
  try {
    const [userRows] = await pool.query('SELECT id FROM usuarios WHERE id = ?', [criado_por]);
    if (userRows.length === 0) {
    }

    await pool.query('INSERT INTO compostos (nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por, foto1, foto2) VALUES (?, ?, ?, ?, ?, ?, ?)', [nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por, foto1, foto2]);
    res.redirect('/compostos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET update composto form
router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM compostos WHERE id = ?', [id]);
    const [gruposFuncionais] = await pool.query('SELECT * FROM grupos_funcionais');
    const composto = rows[0];
    composto.criadoEm = format(new Date(composto.criado_em), 'dd/MM/yyyy HH:mm:ss');
    res.render('DEV/compostos/upcompostos', { composto, gruposFuncionais });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST update composto
router.post('/update/:id', upload.fields([{ name: 'foto1', maxCount: 1 }, { name: 'foto2', maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por } = req.body;
  const foto1 = req.files && req.files['foto1'] ? req.files['foto1'][0].filename : null;
  const foto2 = req.files && req.files['foto2'] ? req.files['foto2'][0].filename : null;

  try {
    const [userRows] = await pool.query('SELECT id FROM usuarios WHERE id = ?', [criado_por]);
    if (userRows.length === 0) {
      return res.status(400).send('Usuário não encontrado');
    }

    if (!foto1) {
      return res.status(400).send('Foto 1 é obrigatória');
    }

    const updateQuery = 'UPDATE compostos SET nome = ?, formula_molecular = ?, estrutura_molecular = ?, grupo_funcional_id = ?, criado_por = ?';
    const queryParams = [nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por];
    if (foto1) {
      updateQuery += ', foto1 = ?';
      queryParams.push(foto1);
    }
    if (foto2) {
      updateQuery += ', foto2 = ?';
      queryParams.push(foto2);
    }
    updateQuery += ' WHERE id = ?';
    queryParams.push(id);

    await pool.query(updateQuery, queryParams);
    res.redirect('/compostos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET delete composto
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM compostos WHERE id = ?', [id]);
    res.redirect('/compostos');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
