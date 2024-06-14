const pool = require('../../db');

const getAllGruposFuncionais = async () => {
    const [rows] = await pool.query('SELECT * FROM grupos_funcionais');
    return rows;
};

const getGrupoFuncionalById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM grupos_funcionais WHERE id = ?', [id]);
    return rows[0];
};

const addGrupoFuncional = async (nome, descricao, foto1, foto2) => {
    await pool.query('INSERT INTO grupos_funcionais (nome, descricao, foto1, foto2) VALUES (?, ?, ?, ?)', [nome, descricao, foto1, foto2]);
};

const updateGrupoFuncional = async (id, nome, descricao, foto1, foto2) => {
    await pool.query('UPDATE grupos_funcionais SET nome = ?, descricao = ?, foto1 = ?, foto2 = ? WHERE id = ?', [nome, descricao, foto1, foto2, id]);
};

const deleteGrupoFuncional = async (id) => {
    await pool.query('DELETE FROM grupos_funcionais WHERE id = ?', [id]);
};

module.exports = {
    getAllGruposFuncionais,
    getGrupoFuncionalById,
    addGrupoFuncional,
    updateGrupoFuncional,
    deleteGrupoFuncional
};
