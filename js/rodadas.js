const grupos = {
    "Grupo A": ["México", "Coreia do Sul", "África do Sul", "República Tcheca"],
    "Grupo B": ["Canadá", "Bósnia e Herzegovina", "Catar", "Suíça"],
    "Grupo C": ["Brasil", "Marrocos", "Haiti", "Escócia"],
    "Grupo D": ["Estados Unidos", "Paraguai", "Austrália", "Turquia"],
    "Grupo E": ["Alemanha", "Curaçao", "Costa do Marfim", "Equador"],
    "Grupo F": ["Holanda", "Japão", "Suécia", "Tunísia"],
    "Grupo G": ["Bélgica", "Egito", "Irã", "Nova Zelândia"],
    "Grupo H": ["Espanha", "Cabo Verde", "Arábia Saudita", "Uruguai"],
    "Grupo I": ["França", "Senegal", "Iraque", "Noruega"],
    "Grupo J": ["Argentina", "Áustria", "Argélia", "Jordânia"],
    "Grupo K": ["Portugal", "Colômbia", "República Democrática do Congo", "Uzbequistão"],
    "Grupo L": ["Inglaterra", "Croácia", "Gana", "Panamá"]
};

const bandeiras = {
    "Brasil": "br", "Argentina": "ar", "França": "fr", "Portugal": "pt",
    "Alemanha": "de", "Espanha": "es", "Inglaterra": "gb", "Uruguai": "uy",
    "Colômbia": "co", "México": "mx", "Canadá": "ca", "Estados Unidos": "us",

    "Japão": "jp", "Coreia do Sul": "kr", "Arábia Saudita": "sa",
    "Irã": "ir", "Iraque": "iq", "Jordânia": "jo", "Uzbequistão": "uz",

    "Marrocos": "ma", "Tunísia": "tn", "Argélia": "dz", "Egito": "eg",
    "Senegal": "sn", "Gana": "gh", "Costa do Marfim": "ci",
    "África do Sul": "za", "Cabo Verde": "cv",

    "Holanda": "nl", "Suécia": "se", "Noruega": "no", "Suíça": "ch",
    "Áustria": "at", "Croácia": "hr", "Escócia": "gb",

    "Austrália": "au", "Nova Zelândia": "nz",

    "Panamá": "pa", "Paraguai": "py",

    "Catar": "qa",
    "Bósnia e Herzegovina": "ba",
    "República Tcheca": "cz",
    "República Democrática do Congo": "cd",
    "Curaçao": "cw",
    "Haiti": "ht"
};

function renderizarGrupos() {
    const container = document.getElementById("gruposContainer");
    if (!container) return;

    container.innerHTML = "";

    for (let grupo in grupos) {
        const divGrupo = document.createElement("div");
        divGrupo.style.marginBottom = "20px";

        const titulo = document.createElement("h4");
        titulo.textContent = grupo;
        divGrupo.appendChild(titulo);

        grupos[grupo].forEach(time => {
            const codigo = bandeiras[time] || "xx";

            const linha = document.createElement("div");

            linha.innerHTML = `
                <img src="https://flagcdn.com/w40/${codigo}.png" width="30" style="margin-right:8px;">
                ${time}
            `;

            divGrupo.appendChild(linha);
        });

        container.appendChild(divGrupo);
    }
}

// ✅ carregamento automático
document.addEventListener("DOMContentLoaded", renderizarGrupos);
