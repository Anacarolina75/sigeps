const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Importar as rotas corretamente
const usuarioRoutes = require('./routes/usuario');
const sistemaRoutes = require('./routes/sistema');
const chamadoRoutes = require('./routes/chamado');
const planoRoutes = require('./routes/plano');
const especialidadeRoutes = require('./routes/especialidade');
const cronogramaRoutes = require('./routes/cronograma');
const atividadeRoutes = require('./routes/atividade');
const recursoRoutes = require('./routes/recurso');

// Usar as rotas corretamente
app.use('/usuario', usuarioRoutes);
app.use('/sistema', sistemaRoutes);
app.use('/chamado', chamadoRoutes);
app.use('/plano', planoRoutes);
app.use('/especialidade', especialidadeRoutes);
app.use('/cronograma', cronogramaRoutes);
app.use('/atividade', atividadeRoutes);
app.use('/recurso', recursoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
