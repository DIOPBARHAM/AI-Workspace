/* ==================================================================
   NAVIGATION ENTRE MODULES
   (nécessaire dès la Partie 1 pour que le menu latéral fonctionne)
================================================================== */
const menuItems = document.querySelectorAll(".menu-item");
const modules = document.querySelectorAll(".module");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems.forEach((i) => i.classList.remove("active"));
    modules.forEach((m) => m.classList.remove("active"));

    item.classList.add("active");
    document.getElementById(item.dataset.target).classList.add("active");
  });
});

/* ==================================================================
   PARTIE 1 — Contenu du tableau de bord (texte géré en JS)
   Reprend les données "Activité récente" et "Modèles populaires"
   affichées dans la maquette de l'atelier.
================================================================== */
const activitesRecentes = [
  { activite: "Résumé du document_projet.pdf", service: "Résumé de texte", utilisateur: "Admin User", date: "21/05/2024 14:32" },
  { activite: "Classification de sentiments", service: "Classification", utilisateur: "Admin User", date: "21/05/2024 14:21" },
  { activite: "Traduction FR → EN", service: "Traduction", utilisateur: "Admin User", date: "21/05/2024 14:15" },
  { activite: "Discussion sur l'IA générative", service: "Chat", utilisateur: "Admin User", date: "21/05/2024 14:05" },
  { activite: "Génération d'idées de projet", service: "Idées", utilisateur: "Admin User", date: "21/05/2024 13:50" },
];

const modelesPopulaires = [
  { modele: "mistral-7b-instruct", utilisations: 532 },
  { modele: "gpt-4-turbo", utilisations: 389 },
  { modele: "llama-3-8b", utilisations: 256 },
  { modele: "bert-base-uncased", utilisations: 179 },
  { modele: "google-translate-v1", utilisations: 142 },
];

function afficherActiviteRecente() {
  const tbody = document.querySelector("#table-activite tbody");
  tbody.innerHTML = activitesRecentes
    .map(
      (a) => `
      <tr>
        <td>${a.activite}</td>
        <td>${a.service}</td>
        <td>${a.utilisateur}</td>
        <td>${a.date}</td>
      </tr>`
    )
    .join("");
}

function afficherModelesPopulaires() {
  const tbody = document.querySelector("#table-modeles tbody");
  tbody.innerHTML = modelesPopulaires
    .map(
      (m) => `
      <tr>
        <td>${m.modele}</td>
        <td>${m.utilisations}</td>
      </tr>`
    )
    .join("");
}

afficherActiviteRecente();
afficherModelesPopulaires();

/* ==================================================================
   PARTIE 3 — RÉSUMÉ DE TEXTE (simulé)
================================================================== */
document.getElementById("resume-btn").addEventListener("click", () => {
  const texte = document.getElementById("resume-input").value.trim();
  const output = document.getElementById("resume-output");

  if (!texte) {
    output.textContent = "Veuillez saisir un texte à résumer.";
    return;
  }

  // Simulation : on garde juste les 20 premiers mots
  const resume = texte.split(" ").slice(0, 20).join(" ") + "...";
  output.textContent = resume;

  saveToHistory("Résumé de texte", texte, resume);
});

/* ==================================================================
   PARTIE 4 — TRADUCTION (simulée)
================================================================== */
document.getElementById("traduction-btn").addEventListener("click", () => {
  const texte = document.getElementById("traduction-input").value.trim();
  const langue = document.getElementById("traduction-langue").value;
  const output = document.getElementById("traduction-output");

  if (!texte) {
    output.textContent = "Veuillez saisir un texte à traduire.";
    return;
  }

  const langues = { en: "anglais", es: "espagnol", de: "allemand", ar: "arabe" };
  const traduction = `[Traduction simulée en ${langues[langue]}] ${texte}`;
  output.textContent = traduction;

  saveToHistory("Traduction", texte, traduction);
});

/* ==================================================================
   PARTIE 5 — CHAT IA (simulé)
================================================================== */
document.getElementById("chat-send").addEventListener("click", envoyerMessage);
document.getElementById("chat-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") envoyerMessage();
});

function envoyerMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  const chatBox = document.getElementById("chat-messages");

  if (!message) return;

  ajouterMessage(chatBox, message, "user");

  const reponse = `Voici une réponse simulée à : "${message}"`;
  ajouterMessage(chatBox, reponse, "ia");

  saveToHistory("Chat", message, reponse);
  input.value = "";
}

function ajouterMessage(chatBox, texte, type) {
  const div = document.createElement("div");
  div.classList.add("chat-message", type);
  div.textContent = texte;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ==================================================================
   PARTIE 6 — PRÉDICTION (fictive)
================================================================== */
document.getElementById("pred-btn").addEventListener("click", () => {
  const age = document.getElementById("pred-age").value;
  const revenu = document.getElementById("pred-revenu").value;
  const ville = document.getElementById("pred-ville").value.trim();
  const output = document.getElementById("pred-output");

  if (!age || !revenu || !ville) {
    output.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  // Simulation : prédiction fictive basée sur les données
  const score = (Number(age) * 0.3 + Number(revenu) * 0.0001).toFixed(2);
  const resultat = `Profil : ${ville} — score de prédiction fictif : ${score}`;
  output.textContent = resultat;

  saveToHistory("Prédiction", `âge=${age}, revenu=${revenu}, ville=${ville}`, resultat);
});
