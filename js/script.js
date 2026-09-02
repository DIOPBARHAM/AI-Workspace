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