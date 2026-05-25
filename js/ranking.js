document.addEventListener("DOMContentLoaded", async () => {

    const tabela = document.getElementById("tabelaRanking");
    tabela.innerHTML = "";

    const participantesSnap = await firebase.database().ref("participantes").once("value");
    const palpitesSnap = await firebase.database().ref("palpites").once("value");
    const resultadosSnap = await firebase.database().ref("jogos").once("value");

    const participantes = participantesSnap.val() || {};
    const palpites = palpitesSnap.val() || {};
    const resultados = resultadosSnap.val() || {};

    let ranking = [];

    for (let nome in participantes) {

        let pontos = 0;

        if (palpites[nome]) {
            for (let jogoId in palpites[nome]) {

                const palpite = palpites[nome][jogoId];
                const resultado = resultados[jogoId];

                if (!resultado) continue;

                // ✅ ACERTO EXATO
                if (
                    palpite.gols1 === resultado.gols1 &&
                    palpite.gols2 === resultado.gols2
                ) {
                    pontos += 3;
                }
                // ✅ ACERTO VENCEDOR
                else if (
                    (palpite.gols1 > palpite.gols2 && resultado.gols1 > resultado.gols2) ||
                    (palpite.gols1 < palpite.gols2 && resultado.gols1 < resultado.gols2) ||
                    (palpite.gols1 === palpite.gols2 && resultado.gols1 === resultado.gols2)
                ) {
                    pontos += 1;
                }

            }
        }

        ranking.push({
            nome: nome,
            pontos: pontos
        });
    }

    ranking.sort((a, b) => b.pontos - a.pontos);

    ranking.forEach((p, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.nome}</td>
            <td>${p.pontos}</td>
        `;

        tabela.appendChild(tr);
    });

});
