const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientes');
const { simularEnvio } = require('./notificacoes');


app.use(express.json());
app.use(express.static('public'));
app.use('/api/clientes', clientesRoutes);
app.post('/simular-envio', (req, res) => {
  const cliente = req.body;
  const { simularEnvio } = require('./notificacoes');

  // Verifica se o tipo de notificação está presente
  if (!cliente.notificacao) {
    return res.status(400).json({ erro: 'Tipo de notificação não informado' });
  }

  const resultado = simularEnvio(cliente.notificacao, cliente);
  res.json(resultado);
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));