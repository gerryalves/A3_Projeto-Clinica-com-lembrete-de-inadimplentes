const db = require('../models/db');

// Listar todos os clientes
function listarClientes(req, res) {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

// Adicionar novo cliente
function adicionarCliente(req, res) {
  const { nome, email, plano, valor, vencimento } = req.body;
  db.run(`INSERT INTO clientes (nome, email, plano, valor, vencimento) VALUES (?, ?, ?, ?, ?)`,
    [nome, email, plano, valor, vencimento],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, nome, email, plano, valor, vencimento });
    });
}

// Atualizar cliente
function atualizarCliente(req, res) {
  const id = req.params.id;
  const { nome, email, plano, valor, vencimento } = req.body;
  db.run(`UPDATE clientes SET nome = ?, email = ?, plano = ?, valor = ?, vencimento = ? WHERE id = ?`,
    [nome, email, plano, valor, vencimento, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, nome, email, plano, valor, vencimento });
    });
}

// Excluir cliente
function excluirCliente(req, res) {
  const id = req.params.id;
  db.run(`DELETE FROM clientes WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cliente excluído com sucesso", id });
  });
}

module.exports = {
  listarClientes,
  adicionarCliente,
  atualizarCliente,
  excluirCliente
};