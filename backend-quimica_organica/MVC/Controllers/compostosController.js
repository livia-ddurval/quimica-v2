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
const upload = multer({ storage: storage });

// GET all compostos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        compostos.id, 
        compostos.nome, 
        compostos.formula_molecular, 
        compostos.estrutura_molecular, 
        grupos_funcionais.nome AS grupo_funcional_nome,
        compostos.criado_por, 
        compostos.criado_em, 
        compostos.foto1, 
        compostos.foto2
      FROM compostos 
      LEFT JOIN grupos_funcionais ON compostos.grupo_funcional_id = grupos_funcionais.id
    `);

    const compostos = rows.map(composto => ({
      id: composto.id,
      nome: composto.nome,
      formula_molecular: composto.formula_molecular,
      estrutura_molecular: composto.estrutura_molecular,
      grupo_funcional_nome: composto.grupo_funcional_nome,
      criado_em: format(new Date(composto.criado_em), 'dd/MM/yyyy HH:mm:ss'),
      foto1: composto.foto1,
      foto2: composto.foto2
    }));

    res.render('DEV/compostos/listcompostos', { compostos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao recuperar compostos');
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

    // Modificado para inserir no banco de dados com ou sem foto2
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
    console.error(err);
    res.status(500).send('Erro ao recuperar compostos');
  }
});

// POST update composto
router.post('/update/:id', upload.fields([{ name: 'foto1', maxCount: 1 }, { name: 'foto2', maxCount: 1 }]), async (req, res) => {
  const { id } = req.params;
  const { nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por } = req.body;
  const foto1 = req.files['foto1'] ? req.files['foto1'][0].filename : null;
  const foto2 = req.files['foto2'] ? req.files['foto2'][0].filename : null;

  const updateQuery = 'UPDATE compostos SET nome = ?, formula_molecular = ?, estrutura_molecular = ?, grupo_funcional_id = ?, criado_por = ?, foto1 = ?, foto2 = ? WHERE id = ?';
  await pool.query(updateQuery, [nome, formula_molecular, estrutura_molecular, grupo_funcional_id, criado_por, foto1, foto2, id]);
  res.redirect('/compostos');

});

// DELETE composto
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM compostos WHERE id = ?', [id]);
    res.json({ message: `Composto com ID ${id} deletado com sucesso`, affectedRows: result.affectedRows });
  } catch (error) {
    console.error('Erro ao deletar composto:', error);
    res.status(500).json({ error: 'Erro ao deletar composto' });
  }
});




module.exports = router;
