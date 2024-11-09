// routes/plano_recurso.js
const express = require('express');
const router = express.Router();
const pool = require('../banco/bd');

// GET - Todas as associações entre plano e recurso
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM plano_recurso');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Associação específica entre plano e recurso
router.get('/:id_plano/:id_recurso', async (req, res) => {
  try {
    const { id_plano, id_recurso } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM plano_recurso WHERE id_plano = ? AND id_recurso = ?',
      [id_plano, id_recurso]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Associação não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Criar uma nova associação entre plano e recurso
router.post('/', async (req, res) => {
  const { id_plano, id_recurso } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO plano_recurso (id_plano, id_recurso) VALUES (?, ?)',
      [id_plano, id_recurso]
    );
    res.json({ id_plano, id_recurso });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Remover uma associação entre plano e recurso
router.delete('/:id_plano/:id_recurso', async (req, res) => {
  try {
    const { id_plano, id_recurso } = req.params;
    await pool.query(
      'DELETE FROM plano_recurso WHERE id_plano = ? AND id_recurso = ?',
      [id_plano, id_recurso]
    );
    res.json({ message: 'Associação removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
