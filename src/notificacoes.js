function gerarMensagem(tipo, cliente) {
  const mensagens = {
    'Aviso amigável': `Olá ${cliente.nome}, seu plano está com vencimento próximo.`,
    'Lembrete formal': `Prezado ${cliente.nome}, seu pagamento está em atraso.`,
    'Notificação final': `Último aviso, ${cliente.nome}: seu plano será suspenso se não houver pagamento.`
  };

  return mensagens[tipo] || '';
}

function simularEnvio(tipo, cliente) {
  const mensagem = gerarMensagem(tipo, cliente);
  const log = `[SIMULADO] ${tipo} enviado para ${cliente.email}:\n${mensagem}`;
  console.log(log);

  // Retorna para exibir no front
  return {
    tipo,
    email: cliente.email,
    mensagem,
    timestamp: new Date().toLocaleString('pt-BR')
  };
}

module.exports = { gerarMensagem, simularEnvio };