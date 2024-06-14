const pool = require('../../db');

const getAllUsuarios = async () => {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
};

const getUsuarioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

const addUsuario = async (nome, email, senha, tipo) => {
  await pool.query('INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', [nome, email, senha, tipo]);
};

const updateUsuario = async (id, nome, email, senha, tipo) => {
  await pool.query('UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?', [nome, email, senha, tipo, id]);
};

const deleteUsuario = async (id) => {
  await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario
};
