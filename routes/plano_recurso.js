// routes/plano_recurso.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todos os planos de recurso
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plano_recurso');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Plano de recurso por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plano_recurso WHERE id_planorecurso = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Plano de recurso não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar novo plano de recurso
router.post('/', async (req, res) => {
  const { id_plano, id_recurso } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO plano_recurso (id_plano, id_recurso) VALUES (?, ?)',
      [id_plano, id_recurso]
    );
    res.json({ id_planorecurso: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Atualizar plano de recurso
router.put('/:id', async (req, res) => {
  const { id_plano, id_recurso } = req.body;
  try {
    await pool.query(
      'UPDATE plano_recurso SET id_plano = ?, id_recurso = ? WHERE id_planorecurso = ?',
      [id_plano, id_recurso, req.params.id]
    );
    res.json({ message: 'Plano de recurso atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Deletar plano de recurso
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM plano_recurso WHERE id_planorecurso = ?', [req.params.id]);
    res.json({ message: 'Plano de recurso deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
