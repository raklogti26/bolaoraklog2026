async function calcularPontuacao() {
  const participantes = await fetch("dados/participantes.json").then(r => r.json());
  const jogosData = await fetch("dados/jogos.json").then(r => r.json());
  const palpites = await fetch("dados/palpites.json").then(r => r.json());

  // Indexar jogos por ID
  const jogos = {};
  jogosData.grupos.forEach(g =>
    g.jogos.forEach(j => jogos[j.id] = j)
  );
  jogosData.eliminatorias.forEach(f =>
    f.jogos.forEach(j => jogos[j.id] = j)
  );

  // Zerar pontuação
  participantes.forEach(p => p.pontos = 0);

  // Avaliar palpites de jogos
  palpites.forEach(palpite => {
    // Palpite de CAMPEÃO é tratado depois
    if (!palpite.id_jogo) return;

    const jogo = jogos[palpite.id_jogo];
    if (!jogo || jogo.status !== "encerrado") return;

    const participante = participantes.find(p => p.id === palpite.id_participante);
    if (!participante) return;

    // Placar exato
    if (
      palpite.palpite_gols1 === jogo.gols1 &&
      palpite.palpite_gols2 === jogo.gols2
    ) {
      participante.pontos += 10;
      return;
    }

    // Resultado correto
    const resultadoReal = Math.sign(jogo.gols1 - jogo.gols2);
    const resultadoPalpite = Math.sign(palpite.palpite_gols1 - palpite.palpite_gols2);

    if (resultadoReal === resultadoPalpite) {
      participante.pontos += 5;
    }
  });

  // Avaliar palpite de CAMPEÃO (+20)
  if (jogosData.campeao_real) {
    palpites.forEach(palpite => {
      if (!palpite.campeao) return;

      const participante = participantes.find(p => p.id === palpite.id_participante);
      if (!participante) return;

      if (palpite.campeao === jogosData.campeao_real) {
        participante.pontos += 20;
      }
    });
  }

  return participantes;
}
