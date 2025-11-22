const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientes');

app.use(express.json());
app.use(express.static('public'));
app.use('/api/clientes', clientesRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));