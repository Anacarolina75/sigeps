// src/pages/SelecionarChamado.jsx

import React, { useState } from 'react';

const SelecionarChamado = () => {
  const [tipoChamado, setTipoChamado] = useState('');
  const [tituloChamado, setTituloChamado] = useState('');
  const [descricaoChamado, setDescricaoChamado] = useState('');
  const [chamadosAbertos, setChamadosAbertos] = useState([
    { id: 1, tipo: 'Implantação', titulo: 'Novo Sistema de Gestão', descricao: 'Implantação de novo sistema para gestão de tarefas' },
    { id: 2, tipo: 'Teste', titulo: 'Teste de Performance', descricao: 'Teste de carga do sistema atual' },
    { id: 3, tipo: 'Manutenção', titulo: 'Atualização de Segurança', descricao: 'Manutenção para atualizar a segurança do sistema' },
  ]); // Lista de chamados abertos (dados fictícios)

  const tiposChamados = ['Implantação', 'Teste', 'Manutenção'];

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoChamado = {
      id: chamadosAbertos.length + 1,
      tipo: tipoChamado,
      titulo: tituloChamado,
      descricao: descricaoChamado,
    };

    setChamadosAbertos([...chamadosAbertos, novoChamado]); // Adiciona o novo chamado à lista
    setTipoChamado('');
    setTituloChamado('');
    setDescricaoChamado('');
  };

  return (
    <div className="container">
      <h1>Registrar Chamado</h1>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="tipoChamado">Tipo de Chamado:</label>
          <select
            id="tipoChamado"
            value={tipoChamado}
            onChange={(e) => setTipoChamado(e.target.value)}
            required
          >
            <option value="">Selecione um tipo de chamado</option>
            {tiposChamados.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          <label htmlFor="tituloChamado">Título do Chamado:</label>
          <input
            type="text"
            id="tituloChamado"
            value={tituloChamado}
            onChange={(e) => setTituloChamado(e.target.value)}
            required
          />

          <label htmlFor="descricaoChamado">Descrição do Chamado:</label>
          <textarea
            id="descricaoChamado"
            value={descricaoChamado}
            onChange={(e) => setDescricaoChamado(e.target.value)}
            required
          />

          <button type="submit">Registrar Chamado</button>
        </form>
      </div>

      <div className="lista-container">
        <h2>Chamados Abertos</h2>
        <ul>
          {chamadosAbertos.map((chamado) => (
            <li key={chamado.id}>
              <strong>Tipo:</strong> {chamado.tipo}<br />
              <strong>Título:</strong> {chamado.titulo}<br />
              <strong>Descrição:</strong> {chamado.descricao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelecionarChamado;
